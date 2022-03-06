const { selectTopics, insertTopic } = require("../models/topics");

exports.getTopics = (req, res) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.postTopic = ({ body }, res, next) => {
  insertTopic(body)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
