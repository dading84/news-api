const { checkExists } = require("../db/helpers/utils");
const {
  selectArticle,
  updateArticle,
  selectArticles,
  insertArticle,
  deleteArticle,
} = require("../models/articles");

exports.getArticles = ({ query }, res, next) => {
  const promises = [
    selectArticles(
      query.sort_by,
      query.order,
      query.topic,
      query.limit,
      query.p
    ),
  ];
  if (query.topic) promises.push(checkExists("topics", "slug", query.topic));
  Promise.all(promises)
    .then(([articles]) => {
      const total_count = articles.length ? articles[0].total_count : 0;
      articles.forEach((article) => delete article.total_count);
      res.status(200).send({ total_count, articles });
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

exports.removeArticle = ({ params }, res, next) => {
  deleteArticle(params.article_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
