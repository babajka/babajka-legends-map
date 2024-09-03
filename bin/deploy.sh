#!/usr/bin/env bash

npm i --force
CI=true GENERATE_SOURCEMAP=false REACT_APP_WIR_ENV=production npm run build

ssh wir-dev@dev.wir.by "rm -rf /home/wir-dev/babajka-legends-map/*"

scp -r build wir-dev@dev.wir.by:/home/wir-dev/babajka-legends-map/
