#!/usr/bin/env bash

npm i
REACT_APP_WIR_ENV=production npm run build

scp -r build wir-dev@dev.wir.by:/home/wir-dev/babajka-legends-map/
