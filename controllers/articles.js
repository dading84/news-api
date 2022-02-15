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
  updateArticle(params.article_id, body.inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
