package common

import (
	"sync"
)

const (
	maxRestAPIPayload    = 1073741824
	TestStatusPass       = "PASS"
	TestStatusFailed     = "FAILED"
	TestStatusInProgress = "INPROGRESS"
	TestStatusOK         = "ok"
)

var (
	TestStatusMap     map[string]string
	TestStatusMapLock = &sync.RWMutex{}
)
