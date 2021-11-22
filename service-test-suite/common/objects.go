package common

import (
	"sync"
)

const (
	maxRestAPIPayload    = 1073741824
	TestStatusPass       = "PASS"
	TestStatusFailed     = "FAILED"
	TestStatusInProgress = "IN-PROGRESS"
	TestStatusOK         = "ok"
	TestStatusNotInvoked = "NOT-INVOKED"
	TestStatusTimeOut    = "TIMEOUT"
	DefaultTimeOut       = 600
)

var (
	TestStatusMap     map[string]string
	TestStatusMapLock = &sync.RWMutex{}
)
