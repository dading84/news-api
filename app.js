const express = require("express");
const apiRouter = require("./routes/api");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors");
const res = require("express/lib/response");

const app = express();

app.get("/greeting", (req, res, next) => {
  res.status(200).send({ msg: "Welcome!" });
});

app.use(express.json());
app.use("/api", apiRouter);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
