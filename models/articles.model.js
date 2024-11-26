const db = require("../db/connection")

const selectArticleById = (article_id) => {
  return db.query(`SELECT * FROM articles WHERE article_id = $1;`,
      [article_id])
      .then(({rows}) => {
        if(rows.length === 0) {
          return Promise.reject({status: 404, msg: "Article not found"})
        }
      return rows[0]
    })
    .catch((err) => {
      if (err.code === "22P02") {
        return Promise.reject({ status: 400, msg: "Invalid article ID" })
      }
      throw err
    });
  }

const selectAllArticles = () => {
    return db
      .query(
        `SELECT 
          articles.author, 
          articles.title, 
          articles.article_id, 
          articles.topic, 
          articles.created_at, 
          articles.votes, 
          articles.article_img_url,
          COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC;`
      )
      .then(({ rows }) => {
        return rows;
      })
      .catch((err) => {
        console.error("Unexpected error in selectAllArticles:", err);
        throw err;
      })
  }
  

module.exports = {selectAllArticles, selectArticleById}