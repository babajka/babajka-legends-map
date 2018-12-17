#!/usr/bin/env bash

npm i
npm run fetch-data

npm run build

scp -r build wir-dev@dev.wir.by:/home/wir-dev/babajka-legends-map/
