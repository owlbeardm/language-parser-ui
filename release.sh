#!/bin/bash

# if [ -z $1 ]; then
#         echo "Releasing language-parser into gh-pages branch"
#         echo "Missed version"
#         echo "Usage: release.sh <release version>"
#         exit 1;
# fi

echo "Releasing language-parser new version"

git stash
git flow release start new
rm -rf dist

if [ -z $1 ];
then
  version=$(npm version patch)
elif [ "$1" == "minor" ];
then
  version=$(npm version minor)
else
  version=$(npm version $1)
fi

yarn build-prod
git add -A
git commit -am "prerelease $version"
git flow release publish new
git checkout gh-pages
git pull
rm *.js
rm *.json
rm *.txt
rm *.png
rm *.css
rm *.svg
rm *.html
cp -a dist/language-parser-ui/. .
git add -A
git commit -am "gh-pages release $version"
git push
git checkout release/new
git flow release finish -nm "$version" new
