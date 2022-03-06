const db = require("../db/connection.js");

exports.selectArticles = (
  sortBy = "created_at",
  order = "desc",
  topic = null,
  limit = 10,
  p = 1
) => {
  const columnGreenList = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const sortGreenList = ["asc", "desc"];

  if (!columnGreenList.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "Invalid sort by!" });
  } else if (!sortGreenList.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order by!" });
  }

  const offset = Number((p - 1) * limit);
  limit = Number(limit) ? Number(limit) : "ALL";

  const queryValues = [];
  if (topic) queryValues.push(topic);

  const query = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, 
  COUNT(*) OVER()::INT AS total_count,
  COUNT(c.comment_id)::INT AS comment_count
  FROM articles AS a 
  LEFT JOIN comments AS c 
  ON a.article_id = c.article_id 
  ${topic ? ` WHERE topic = $1` : ""}
  GROUP BY a.article_id
  ORDER BY ${sortBy} ${order.toUpperCase()}
  OFFSET ${offset}
  LIMIT ${limit};`;

  return db.query(query, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.selectArticle = (id) => {
  return db
    .query(
      `SELECT a.*, COUNT(c.comment_id)::INT AS comment_count 
      FROM articles AS a 
      LEFT JOIN comments AS c 
      ON a.article_id = c.article_id 
      WHERE a.article_id = $1 
      GROUP BY a.article_id;`,
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

exports.insertArticle = ({ title, topic, author, body }) => {
  return db
    .query(
      `
    INSERT INTO articles 
    (title, topic, author, body)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;`,
      [title, topic, author, body]
    )
    .then(({ rows }) => {
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

exports.deleteArticle = (articleId) => {
  return db.query(
    `DELETE FROM articles
    WHERE article_id = $1;
    `,
    [articleId]
  );
};
