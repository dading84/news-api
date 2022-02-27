const db = require("../db/connection.js");

exports.selectCommentsByArticleId = (articleId) => {
  return db
    .query(`SELECT * FROM comments WHERE article_id = $1;`, [articleId])
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertComment = (articleId, { username: author, body }) => {
  return db
    .query(
      `
    INSERT INTO comments 
    (article_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;`,
      [articleId, author, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateComment = (id, votes) => {
  return db
    .query(
      `UPDATE comments
    SET votes = votes + $2
    WHERE comment_id = $1
    RETURNING *;`,
      [id, votes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.deleteComment = (commentId) => {
  return db.query(
    `DELETE FROM comments
    WHERE comment_id = $1;
    `,
    [commentId]
  );
};
