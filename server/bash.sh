#!/bin/bash -ex
# bash-script for launch-template ec2
# install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install node
# get source code from github
git clone https://github.com/alexanderkuepper/bike-sharing
#get in project dir
cd bike-sharing
#install node module
npm install
# start the app
USER=postgres HOST=<URL> PASSWORD=<PASSWORD> node index.js