# news-api

I have created this news API as a part of a skills bootcamp course, run by [Northcoders](https://northcoders.com/)

This RESTful api allows users to: 
 - Add an article or comment
 - View articles, comments, topics and users
 - Vote on articles and comments
 - Delete articles and comments 

I have also implemeted a CI/CD pipeline using GitHub actions. This runs my development tests for the API in a virtual machine whenever code is merged into the main branch, then if tests are successful, it automatically deploys the updated codebase to the Heroku hosting.

View a live demo of the news-api and all available endpoints here: https://dw-nc-news.herokuapp.com/api

There is also a front end project I completed to connect with this backend API: https://github.com/duncan-s-white/fe-nc-news

You can try out the completed hosted project (frontend and backend): https://dw-nc-news.netlify.app/

## Setup locally

### Clone:

`git clone https://github.com/dading84/news-api.git`

### Install dependencies:

`npm install`

### Seed local database:

You will need to create two .env files, `.env.test` and `.env.development`, in the root directory of the repo to use this project, as shown in the `.env.example` file.

They should both contain the text `PGDATABASE=<database_name_here>` stating the database name for your test and development databases respectively.

`npm run seed`

### Run tests:

`npm test`

This will show the output from all the projects tests, from the jest testing suites.

### Start the development server:

`npm start`

Once running you can view all the available endpoints, and a description of them, by visiting http://localhost:9090/api in a web browser

## Minimum tested versions:

Node.js: v16.13.1

Postgres: 12.9
