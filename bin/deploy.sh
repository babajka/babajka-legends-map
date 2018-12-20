#!/usr/bin/env bash

npm i
REACT_APP_WIR_ENV=production npm run build

ssh wir-dev@dev.wir.by "rm -rf /home/wir-dev/babajka-legends-map/*"

# TODO: to avoid copying .map files.

scp -r build wir-dev@dev.wir.by:/home/wir-dev/babajka-legends-map/
