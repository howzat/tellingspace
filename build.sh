#!/usr/bin/env bash

pwd
ls -la
pushd .
cd ./webapp/toldspaces || exit
npm ci
npm run build
popd || exit
pushd .
cd ./cicd || exit
npm ci
npm install -g aws-cdk-lib
popd || exit