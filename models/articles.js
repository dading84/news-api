const db = require("../db/connection.js");

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT article_id, author, body, title, topic, votes, 
      created_at AT TIME ZONE 'GMT' AS created_at
      FROM articles 
      WHERE article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      console.log(rows[0]);
      return rows[0];
    });
};
