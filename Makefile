VOTER_IMG=voter
BALLOT_IMG=ballot
ECSVR_IMG=ecserver
TEST_IMG=service-test-suite
IMAGE_TAG=latest

# HOSTNAME := $(shell hostname)

.PHONY: all
all: dockerise deploy

.PHONY: dockerise
dockerise: build-voter build-ballot build-ecserver build-test

.PHONY: build-ballot
build-ballot:
	docker build -t ${BALLOT_IMG}:${IMAGE_TAG} -f ballot/Dockerfile ballot

.PHONY: build-voter
build-voter:
	docker build -t ${VOTER_IMG}:${IMAGE_TAG} -f voter/Dockerfile voter	

.PHONY: build-ecserver
build-ecserver:
	docker build -t ${ECSVR_IMG}:${IMAGE_TAG} -f ecserver/Dockerfile ecserver

.PHONY: build-test
build-test:
	docker build -t ${TEST_IMG}:${IMAGE_TAG} -f service-test-suite/Dockerfile service-test-suite

.PHONY: deploy
deploy:
	kubectl apply -f ecserver/ecserver.yaml
	kubectl apply -f ballot/ballot.yaml
	kubectl apply -f voter/voter.yaml
	kubectl apply -f service-test-suite/test-suite.yaml

.PHONY: clean
clean:
	kubectl delete -f service-test-suite/test-suite.yaml
	kubectl delete -f voter/voter.yaml
	kubectl delete -f ballot/ballot.yaml
	kubectl delete -f ecserver/ecserver.yaml
