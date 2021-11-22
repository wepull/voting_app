package common

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
)

func ReadAndParseInput(w http.ResponseWriter, r *http.Request, input interface{}) error {

	body, err := ioutil.ReadAll(io.LimitReader(r.Body, maxRestAPIPayload))
	if err != nil {
		fmt.Printf("Error in Reading request Body %+v", err)
		return err
	}
	if err1 := r.Body.Close(); err1 != nil {
		fmt.Printf("Error in Closing body %s\n", err1.Error())
		return err1
	}

	if err2 := json.Unmarshal(body, input); err2 != nil {

		err2 = getUnmarshallErrorString(err2)
		fmt.Printf("Unmarshalling Error. %+v ", err2)

		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(422) // unprocessable entity
		fmt.Fprintf(w, TestStatusFailed)
		return err2
	}
	return nil
}

func getUnmarshallErrorString(unMarshalErr error) error {
	if ute, ok := unMarshalErr.(*json.UnmarshalTypeError); ok {
		return errors.New("Input " + ute.Value + " for field " + ute.Field + " is incorrect.")
	}
	return unMarshalErr
}
