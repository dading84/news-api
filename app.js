const express = require("express");
const { getArticle, patchArticle } = require("./controllers/articles");
const {
  invalidPath,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors");
const { getTopics } = require("./controllers/topics");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.patch("/api/articles/:article_id", patchArticle);

app.all("/*", invalidPath);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
