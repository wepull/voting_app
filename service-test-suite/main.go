package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/roost-io/roost-example/voting_app/service-test-suite/ballot"
	"github.com/roost-io/roost-example/voting_app/service-test-suite/common"
)

func runTest(w http.ResponseWriter, r *http.Request) {

	var req ballot.TestReq

	var err error

	if err = common.ReadAndParseInput(w, r, &req); err != nil {
		return
	}

	url := req.IP + ":" + req.Port

	defer func(err error, url string) {
		if err != nil {
			common.TestStatusMapLock.Lock()
			common.TestStatusMap[url] = common.TestStatusFailed
			common.TestStatusMapLock.Unlock()
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Content-Type", "application/json")
		w.Write([]byte(common.TestStatusOK))
	}(err, url)

	common.TestStatusMapLock.Lock()
	common.TestStatusMap[url] = common.TestStatusInProgress
	common.TestStatusMapLock.Unlock()
	err = ballot.BallotRunTest(req)
	if err != nil {
		fmt.Printf("run test error:%+v", err)
		return
	}
	common.TestStatusMapLock.Lock()
	common.TestStatusMap[url] = common.TestStatusPass
	common.TestStatusMapLock.Unlock()

	fmt.Println("Endpoint Hit: runTest")
}

func testResult(w http.ResponseWriter, r *http.Request) {

	var req ballot.TestReq
	var err error
	if err = common.ReadAndParseInput(w, r, &req); err != nil {
		return
	}
	url := req.IP + ":" + req.Port
	var status string
	common.TestStatusMapLock.RLock()
	if val, ok := common.TestStatusMap[url]; ok {
		status = val
	} else {
		status = common.TestStatusPass
	}
	common.TestStatusMapLock.RUnlock()

	ballot.BallotTestResult(req)

	fmt.Fprintf(w, status)
	fmt.Println("Endpoint Hit: testResult")
}

func handleRequests() {
	http.HandleFunc("/tests/run", runTest)
	http.HandleFunc("/tests/result", testResult)
	log.Fatal(http.ListenAndServe(":5003", nil))
}

func main() {
	log.Printf("service test suite is started...")
	handleRequests()
}
