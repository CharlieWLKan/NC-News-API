const db = require("../db/connection")

const selectCommentsByArticleId = (article_id) => {
  const queryStr = `
    SELECT comment_id, votes, created_at, author, body, article_id
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
  `;
  return db.query(queryStr, [article_id]).then(({ rows }) => {
    return rows
  })
}
const insertComment = (article_id, username, body) => {
  const queryStr = `
    INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  return db.query(queryStr, [article_id, username, body]).then(({ rows }) => {
    return rows[0];
  })
}

const deleteCommentById = (comment_id) => {
  const queryStr = `
    DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;
  `;
  return db.query(queryStr, [comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" })
      }
      return rows[0]
    })
}
module.exports = { selectCommentsByArticleId, insertComment, deleteCommentById }