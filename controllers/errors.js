exports.invalidPath = (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
};

exports.psqlError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request!" });
  }
};
