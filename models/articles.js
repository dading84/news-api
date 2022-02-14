const db = require("../db/connection.js");

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT *FROM articles 
      WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
