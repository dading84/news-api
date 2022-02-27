const { removeComment, patchComment } = require("../controllers/comments");

const commentRouter = require("express").Router();

commentRouter.route("/:comment_id").patch(patchComment).delete(removeComment);

module.exports = commentRouter;
