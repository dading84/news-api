const { selectTopics } = require("../models/topics");

exports.getTopics = (req, res) => {
  //console.log("inside controller");
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
