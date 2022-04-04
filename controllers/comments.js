const { checkExists } = require("../db/helpers/utils");
const {
  selectCommentsByArticleId,
  insertComment,
  deleteComment,
  updateComment,
} = require("../models/comments");

exports.getCommentsByArticleId = ({ params, query }, res, next) => {
  const promises = [
    selectCommentsByArticleId(params.article_id, query.limit, query.p),
    checkExists("articles", "article_id", params.article_id),
  ];
  Promise.all(promises)
    .then(([comments]) => {
      const total_count = comments.length ? comments[0].total_count : 0;
      comments.forEach((article) => delete article.total_count);
      res.status(200).send({ total_count, comments });
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

exports.removeComment = ({ params }, res, next) => {
  checkExists("comments", "comment_id", params.comment_id)
    .then(() => {
      return deleteComment(params.comment_id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
