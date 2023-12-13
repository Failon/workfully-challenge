# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := workfully/challenge

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif

default: build
#build image
build:
	docker build -t $(IMAGE_NAME) --progress=plain --no-cache --target prod .

#run the container
run:
	docker run -p 3000:3000 -d $(IMAGE_NAME)

#build and run
start: build run

#build and run the tests
test:
	docker build -t $(IMAGE_NAME) --progress=plain --no-cache --target test .