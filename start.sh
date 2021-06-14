#!/usr/bin/bash

#sudo docker build -t nginx-admin-react:0.1 .
sudo docker run -d --name coffee-factory-admin-stg -p 80:80 nginx-admin-react:0.1