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

## Setup

The entire application is divided into two folders: frontend and backend. To start:

- download or clone repository
- run `npm install` in frontend catalog
- run `npm install` in backend catalog
- to start frontend application run `npm start` in /frontend catalog
- to start backend application run `npm start` in /backend catalog
- to test frontend application run `npm test` in /frontend catalog
- to start backend application run `npm test` in /backend catalog
