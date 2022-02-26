const apiRouter = require("express").Router();
const articleRouter = require("./articles");
const topicRouter = require("./topics");
const userRouter = require("./users");
const commentRouter = require("./comments");
const { getEndpoints } = require("../controllers/api");

apiRouter.get("/", getEndpoints);

apiRouter.use("/articles", articleRouter);
apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
