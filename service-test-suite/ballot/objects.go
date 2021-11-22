package ballot

type TestReq struct {
	IP         string `json:"ip"`
	Port       string `json:"port"`
	KubeConfig string `json:"kubeconfig"`
	TestCriteria
}

type TestCriteria struct {
}

type ballotcountResponse struct {
	Results    []candidateVotes `json:"results"`
	TotalVotes int              `json:"total_votes"`
}

type candidateVotes struct {
	CandidateID string `json:"candidate_id"`
	Votes       int    `json:"vote_count"`
}

type ballotstatus struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type ballotvote struct {
	CandidateID string `json:"candidate_id"`
	VoterID     string `json:"voter_id"`
}
