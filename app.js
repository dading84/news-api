const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors");
const { invalidPath } = require("./controllers/errors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.all("/*", invalidPath);

module.exports = app;
