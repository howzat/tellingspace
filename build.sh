#!/usr/bin/env bash

pushd .
cd ./webapp/toldspaces || exit
npm ci
npm test
npm run build
popd || exit
pushd .
cd ./cicd || exit
npm ci
npm install -g aws-cdk-lib
popd || exit