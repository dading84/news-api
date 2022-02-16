const db = require("../db/connection.js");

exports.selectCommentsArticleById = (articleId) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      return rows;
    });
};
