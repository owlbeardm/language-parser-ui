#!/bin/bash

if [ -z $1 ]; then
        echo "Releasing language-parser into gh-pages branch"
        echo "Missed version"
        echo "Usage: release.sh <release version>"
        exit 1;
fi

echo "Releasing language-parser $1"

git stash
git flow release start $1
yarn build-prod --env.version=$1
git add -A
git commit -am "prerelease $1"
git flow release publish $1
git checkout gh-pages
git pull
rm *.js
rm *.json
rm *.txt
rm *.png
rm *.css
rm *.svg
rm *.html
cp -a dist/. .
git add -A
git commit -am "gh-pages release $1"
git push
git checkout release/$1
git flow release finish -nm "$1" $1
