#!/bin/bash

cd "$(dirname "$0")"

set -ex

npm install
npm run build
