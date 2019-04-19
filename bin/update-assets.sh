#!/usr/bin/env bash

git submodule update --init
cp src/assets/logo/favicon.png public/
cp -r src/assets/icons/logo-* public/
