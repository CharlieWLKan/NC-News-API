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

module.exports = { selectCommentsByArticleId, insertComment }