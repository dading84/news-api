const db = require("../db/connection.js");

exports.selectArticles = () => {
  return db
    .query(
      `SELECT author, title, article_id, topic, created_at, votes 
      FROM articles 
      ORDER BY created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT * FROM articles 
      WHERE article_id = $1;`,
      [id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No article found for article_id: ${id}`,
        });
      }
      return rows[0];
    });
};

exports.updateArticle = (id, votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $2
      WHERE article_id = $1
      RETURNING *;`,
      [id, votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};