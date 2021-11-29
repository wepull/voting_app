# syntax=docker/dockerfile:1

## Dockerfile source --> https://docs.docker.com/language/golang/build-images/#multi-stage-builds

##
## Build
##
FROM golang:1.16-buster AS build

WORKDIR /app

COPY go.mod ./
# COPY go.sum ./ 
# Above line can be uncommented if any dependencies are added and `go mod tidy` is ran
RUN go mod download

COPY *.go ./

RUN go build -o /ec-server

##
## Deploy
##
FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build /ec-server /ec-server

EXPOSE 8081

USER nonroot:nonroot

ENTRYPOINT ["/ec-server"]