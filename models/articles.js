const db = require("../db/connection.js");

exports.selectArticles = (sortBy = "created_at", order = "desc", topic) => {
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

  const queryValues = [];
  if (topic) queryValues.push(topic);

  return db
    .query(
      `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, 
      COUNT(c.comment_id)::INT AS comment_count
      FROM articles AS a 
      LEFT JOIN comments AS c 
      ON a.article_id = c.article_id 
      ${topic ? ` WHERE topic = $1` : ""}
      GROUP BY a.article_id
      ORDER BY ${sortBy} ${order.toUpperCase()};`,
      queryValues
    )
    .then(({ rows }) => {
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
