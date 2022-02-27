const {
  getArticles,
  getArticle,
  patchArticle,
  postArticle,
} = require("../controllers/articles");
const {
  getCommentsByArticleId,
  postComment,
} = require("../controllers/comments");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles).post(postArticle);

articleRouter.route("/:article_id").get(getArticle).patch(patchArticle);

articleRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId);

module.exports = articleRouter;
