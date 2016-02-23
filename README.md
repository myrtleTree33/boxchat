ChatBox App
==============================================

## Development

Install Vagrant and VirtualBox first.

Chatbox uses Vagrant and VirtualBox VM for development standardization. These
are necessary so that everyone has the same standard development environment.
To run, execute the commands below in the project directory:

    vagrant up

Then, ssh into the box:

    vagrant ssh

Then, launch `iron-meteor` to run the app:

    cd /vagrant/boxchat-app && iron

If successful, the app will run on http://localhost:4567 .  View it on your
local browser!


### Re-provision Virtual Machine

    vagrant reload --provision


### SSH into VM

In the project directory:

    vagrant ssh


### Shutdown VM

Use either `vagrant suspend`, `vagrant halt`, or `vagrant destroy`


## Directory Structure

`boxchat-app` contains the iron directory structure, and is automatically
served as `iron` is called within the virtual machine.


## What is installed

`nvm`, `nodeJS v4.3.1`, `MongoDB`, `meteor-iron`, `screen`, `vim`, `gulp`,
`bower`, `grunt-cli`
