#!/usr/bin/env bash
VERSION_TYPE=${1:-patch}
npm run build
git commit . -m "Updates build"
npm version ${VERSION_TYPE} &&
git push &&
git push --tags &&
npm publish
