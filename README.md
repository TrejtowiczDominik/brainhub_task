# Project title

Simple recruitment task for brainhub company

## Table of Content

- About the app
- Technologies
- Setup

## About the app

This application is an recruitment app with frontend implemented in React and connected with a simple API written in Node.js with data saved in MongoDB.
Application allow user to add an event to the database with following fields:

- First name (required)
- Last name (required)
- Email (required, valid email address)
- Event date (required, data picker)

## Technologies

To build frontend application the following additional technologies have been used:

- axios (for communication with backend)
- react-datepicker (to display data picker for event date)
- testing-library (for testing)
- msw (for testing)

To build backend application the following technologies have been used:

- express.js
- body-parser
- mongoose
- mocha (for testing)
- chai (for testing)
- nodemon (for development)

To build e2e tests Cypress have been used.

## Setup

The entire application is divided into thre folders: frontend, backend and e2e. To start:

- download or clone repository

### Without Docker

- run `npm install` in frontend catalog
- run `npm install` in backend catalog
- run `npm install` in e2e catalog
- to start frontend application run `npm start` in /frontend catalog
- to start backend application run `npm start` in /backend catalog
- to run unit tests frontend application run `npm test` in /frontend catalog
- to run unit tests backend application run `npm test` in /backend catalog
- to run end to end tests run `npm run cypress:run` in /e2e catalog (frontend and backend application should be started)

### With Docker

- run `docker-compose build frontend-dev` to build docker image for frontend application.
- run `docker-compose build backend-dev` to build docker image for backend application separately
- run `docker-compose build frontend-test` to build docker image for frontend tests
- run `docker-compose build backend-test` to build docker image for backend tests
- run `docker-compose up fronend-dev` to run frontend application. This action will also create image and run backend application
- run `docker-compose up backend-dev` to run backend application separately
- run `docker-compose up fronend-test` to run frontend tests
- run `docker-compose up backend-test` to run backend tests
