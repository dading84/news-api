const db = require("../db/connection.js");

exports.selectCommentsByArticleId = (articleId, limit = 10, p = 1) => {
  const offset = Number((p - 1) * limit);
  limit = Number(limit) ? Number(limit) : "ALL";
  const query = `
  SELECT *, COUNT(*) OVER()::INT AS total_count 
  FROM comments WHERE article_id = $1
  OFFSET ${offset}
  LIMIT ${limit};`;
  return db.query(query, [articleId]).then(({ rows }) => {
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
