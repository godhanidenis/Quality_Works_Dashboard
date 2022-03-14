#!/bin/bash
sudo chown ubuntu:ubuntu -R /home/ubuntu/qualityworksdev_frontend
sudo chmod 771 -R /home/ubuntu/qualityworksdev_frontend
cd /home/ubuntu/qualityworksdev_frontend
npm install
npm run build
sudo systemctl restart nginx