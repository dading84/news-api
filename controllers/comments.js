const { selectCommentsArticleById } = require("../models/comments");

exports.getCommentsByArticleId = (req, res, next) => {
  selectCommentsArticleById(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
