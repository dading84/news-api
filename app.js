const express = require("express");
const { invalidPath } = require("./controllers/errors");
const { getTopics } = require("./controllers/topics");
const app = express();

app.get("/api/topics", getTopics);

app.all("/*", invalidPath);

module.exports = app;
