# TODO LIST
## _Project for Ubiq_

## Description

The main purpose of the project is to create a todo-list API where the user can register and login, and then it will be able to create tasks with different status and priorities. The main functionalities are:

- Register as a new user in the system
- Login with their credentials
- Delete the account
- Create tasks with different priorities and status.
- List them with pagination
- Update the status of any task created

TO KNOW ALL THE DETAILS ABOUT THE DOCUMENTATION OF THE API, VISIT THE FOLLOWING LINK:
[SWAGGER](https://app.swaggerhub.com/apis-docs/Rod35/Todo-list-ubiq/1.0.0)

_(or use the endpoint: /api/v1/api-docs)_

## Installation

IMPORTANT! This project requires [Node.js](https://nodejs.org/) and Postgres installed in your computer to run. 

In the environment file located in the root of the project (.env), you might have to change some values of the database in order to connect to it.

For running the tests, execute the following command:

`npm test` 

In order to run the project, execute the following command:

`npm start` 

## To improve

One of the improvements to do over the project would be handling better the JWT refresh token logic which right now is not ideal.
The other aspect to improve in this project would be the tests, by making more of them and with more coverage.

## License

MIT

## Author

Rodrigo Luque 

2021
