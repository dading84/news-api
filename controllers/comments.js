const { checkExists } = require("../db/helpers/utils");
const {
  selectCommentsByArticleId,
  insertComment,
} = require("../models/comments");

exports.getCommentsByArticleId = (req, res, next) => {
  const promises = [
    selectCommentsByArticleId(req.params.article_id),
    checkExists("articles", "article_id", req.params.article_id),
  ];
  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = ({ params, body }, res, next) => {
  const promises = [
    checkExists("articles", "article_id", params.article_id),
    checkExists("users", "username", body.username),
  ];
  Promise.all(promises)
    .then(() => {
      return insertComment(params.article_id, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
