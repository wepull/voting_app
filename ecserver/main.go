package main

import (
	"encoding/json"
	"log"
	"net/http"
)

const (
	PORT = ":8081"
)

var (
	candidates = []*Candidate{}
)

// Basic payload to be sent in response to API request
type BasicResponse struct {
	Status  int
	Message string
}

// Payload to send back all candidates
type AllCandidatesResponse struct {
	Candidates []*Candidate
}

type Candidate struct {
	Name     string
	ImageUrl string
}

func writeBasicResponse(w http.ResponseWriter, resp *BasicResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.Status)
	respJson, err := json.Marshal(resp)
	if err != nil {
		log.Println("error marshaling response to vote request. error: ", err)
	}
	w.Write(respJson)
}

func writeAllCandidatesResponse(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	respJson, err := json.Marshal(&AllCandidatesResponse{
		Candidates: candidates,
	})
	if err != nil {
		log.Println("error marshaling response to vote request. error: ", err)
	}
	w.Write(respJson)
}

func getAllCandidates(w http.ResponseWriter, r *http.Request) {
	writeAllCandidatesResponse(w)
}

func addCandidate(w http.ResponseWriter, r *http.Request) {
	newCandidate := &Candidate{}
	err := json.NewDecoder(r.Body).Decode(newCandidate)
	if err != nil {
		resp := &BasicResponse{
			Status:  http.StatusBadRequest,
			Message: "Invalid request payload",
		}
		writeBasicResponse(w, resp)
		return
	}

	candidates = append(candidates, newCandidate)

	writeAllCandidatesResponse(w)
}

func handleInvalidMethod(w http.ResponseWriter, r *http.Request) {
	resp := &BasicResponse{
		Status:  http.StatusMethodNotAllowed,
		Message: "No such endpoint",
	}
	writeBasicResponse(w, resp)
}

func serveRoot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	switch r.Method {
	case http.MethodGet:
		getAllCandidates(w, r)

	case http.MethodPost:
		addCandidate(w, r)

	case http.MethodOptions:
		return

	default:
		handleInvalidMethod(w, r)
	}
}

func main() {
	http.HandleFunc("/", serveRoot)
	log.Printf("Starting a server at port %s", PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}
