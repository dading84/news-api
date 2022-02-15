const { selectArticle, updateArticle } = require("../models/articles");

exports.getArticle = (req, res, next) => {
  selectArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticle = ({ params, body }, res, next) => {
  // console.log("inside patchArticle", params, body);
  if (typeof body.inc_votes === "undefined") {
    next({ status: 400, msg: "Bad request! No inc_votes property" });
  } else {
    updateArticle(params.article_id, body.inc_votes)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  }
};
