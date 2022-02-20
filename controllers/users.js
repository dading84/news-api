const { checkExists } = require("../db/helpers/utils");
const { selectUsers, selectUser } = require("../models/users");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.getUser = ({ params }, res, next) => {
  checkExists("users", "username", params.username)
    .then(() => {
      return selectUser(params.username).then((user) => {
        res.status(200).send({ user });
      });
    })
    .catch(next);
};
