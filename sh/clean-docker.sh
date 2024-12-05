#!/bin/bash

docker stop frontend_container
docker rm frontend_container
docker rmi -f frontend_image
docker system prune -a -f 