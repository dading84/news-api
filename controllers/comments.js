const { checkExists } = require("../db/helpers/utils");
const {
  selectCommentsByArticleId,
  insertComment,
  deleteComment,
  updateComment,
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
  insertComment(params.article_id, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchComment = ({ params, body }, res, next) => {
  updateComment(params.comment_id, body.inc_votes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  deleteComment(req.params.comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
