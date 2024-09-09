#!/bin/bash

# if [ -z $1 ]; then
#         echo "Releasing language-parser into gh-pages branch"
#         echo "Missed version"
#         echo "Usage: release.sh <release version>"
#         exit 1;
# fi

now=$(date +"%Y-%m-%d-%H.%M.%S")

echo "Releasing language-parser $now"

git stash
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

npm run build-prod
git add -A
git commit -am "prerelease $version"
# git flow release publish $now
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
cp index.html 404.html
git add -A
git commit -am "gh-pages release $version"
git push
git checkout main
# git flow release finish -nm "$version" $now
