# To do Website
This is a simple to-do website where a user can create a new to create new to-do, read, update and delete created to-dos.

Prototype: http://3.23.196.152/

## Motivation
Since it is my first time using node.js, I chose a simple project where I can easily explore databases and basic CRUD.

## Installing Dependencies

Download and open the project in the master branch.

I pushed the node modules to git before learning that it was not necessary. The node modules can easily be installed locally by running “npm install” in the terminal. This would install all the dependencies of the project. I decided not to delete the node modules from git up because I am not sure how it might affect my hosting.


## Architecture

![Group 512662](https://user-images.githubusercontent.com/86142501/213312330-c2a5a660-a4d6-411c-b038-817c32242b6e.png)

When are client makes a request through the browser interface (URL inputs, forms, buttons, etc), it is passed to the node server where it is executed

#### Node server
The node server has an event loop which executes a stack of qued request. Requests handled within the server are called middlewares. For requests that need to access the database (blocking i/o), they are handled by the nodejs internal threads which allows it o be processed in the database using models to interact. 

#### MongoDB
The response from the database sends a response to the server using models through the event loop and then the response is sent to the client
