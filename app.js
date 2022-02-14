const express = require("express");
const { getArticle } = require("./controllers/articles");
const { invalidPath } = require("./controllers/errors");
const { getTopics } = require("./controllers/topics");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.all("/*", invalidPath);

module.exports = app;
