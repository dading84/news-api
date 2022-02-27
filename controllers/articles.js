const { checkExists } = require("../db/helpers/utils");
const {
  selectArticle,
  updateArticle,
  selectArticles,
  insertArticle,
} = require("../models/articles");

exports.getArticles = ({ query }, res, next) => {
  const promises = [selectArticles(query.sort_by, query.order, query.topic)];
  if (query.topic) promises.push(checkExists("topics", "slug", query.topic));
  Promise.all(promises)
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  selectArticle(req.params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postArticle = ({ body }, res, next) => {
  insertArticle(body)
    .then((article) => {
      article.comment_count = 0;
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.patchArticle = ({ params, body }, res, next) => {
  updateArticle(params.article_id, body.inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
