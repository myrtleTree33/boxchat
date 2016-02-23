#!/usr/bin/env bash

########################################
## Vagrant bootstrap script
## Joel Haowen Tong (myrtletree33)
########################################

#apt-get update

### Install NodeJS ###
[[ -s $HOME/.nvm/nvm.sh  ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
nvm install v4.3.1
nvm use v4.3.1
nvm alias default v4.3.1

### Install Node dependencies ###
npm install -g gulp grunt-cli bower

### Install Meteor
curl https://install.meteor.com/ | sh
### Install Iron-CLI for Meteor
npm install -g iron-meteor

### Install MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-org


#sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
#echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
#sudo apt-get update
#sudo apt-get install -y mongodb-org
service mongod status

### Install screen and vim
sudo apt-get install -y screen vim


### Website stuff ###

### Ensure MongoDB runs from Meteor in shared directory
mkdir -p $HOME/boxchat-app/app/.meteor/local
sudo mount --bind $HOME/boxchat-app/app/.meteor/local/ /vagrant/boxchat-app/app/.meteor/local

### Launch the website
#cd /vagrant/boxchat-app
#echo "Development website running on http://localhost:4567"
#iron

echo "Vagrant box up and running, type **vagrant ssh** to ssh into the box!"
