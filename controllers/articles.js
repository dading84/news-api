const { selectArticle } = require("../models/articles");

exports.getArticle = (req, res) => {
  selectArticle(req.params.article_id).then((article) => {
    console.log({ article });
    res.status(200).send({ article });
  });
};
