const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    // console.log(rows, "<rows");
    return rows;
  });
};
