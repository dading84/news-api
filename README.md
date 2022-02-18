# news-api

I have created this news api project as a part of a skills bootcamp course, run by [Northcoders](https://northcoders.com/)

View a live demo of the news-api here: https://dw-nc-news.herokuapp.com/api

## Setup

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

## Minimum tested versions:

Node.js: v16.13.1

Postgres: 12.9
