# To do Website
This is a simple to-do website where a user can create a new to create new to-do, read, update and delete created to-dos.

## Motivation
Since it is my first time using node.js, I chose a simple project where I can easily explore databases and basic CRUD.

## Architecture

#### Node server
The node server has an event loop which executes a stack of qued request. Requests handled within the server are called middlewares. For requests that need to access the database (blocking i/o), they are handled by the nodejs internal threads which allows it o be processed in the database. 

#### MongoDB
The response from the database sends a response to the server through the event loop and then the response is sent to the client
