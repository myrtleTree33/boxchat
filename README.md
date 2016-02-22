ChatBox App
==============================================

## Development

Install Vagrant and VirtualBox first.

Chatbox uses Vagrant and VirtualBox VM for development standardization. These
are necessary so that everyone has the same standard development environment.
To run, execute the commands below in the project directory:

    vagrant up

The app will be run on http://localhost:4567


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
