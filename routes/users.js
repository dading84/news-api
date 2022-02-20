const { getUsers, getUser } = require("../controllers/users");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:username", getUser);

module.exports = userRouter;
