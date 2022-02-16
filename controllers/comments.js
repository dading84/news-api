const { checkExists } = require("../db/helpers/utils");
const { selectCommentsArticleById } = require("../models/comments");

exports.getCommentsByArticleId = (req, res, next) => {
  const promises = [
    selectCommentsArticleById(req.params.article_id),
    checkExists("articles", "article_id", req.params.article_id),
  ];
  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
