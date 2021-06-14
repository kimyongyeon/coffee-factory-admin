#!/usr/bin/bash

sudo docker build -t nginx-admin-react:0.1 .
sleep 1
sudo docker rm $(sudo docker stop $(sudo docker ps -a -q --filter="name=coffee-factory-admin-stg" --format="{{.ID}}"))
sleep 1
sudo docker run -d --name coffee-factory-admin-stg -p 80:80 nginx-admin-react:0.1