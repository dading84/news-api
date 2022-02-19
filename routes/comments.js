const { removeComment } = require("../controllers/comments");

const commentRouter = require("express").Router();

commentRouter.delete("/:comment_id", removeComment);

module.exports = commentRouter;
