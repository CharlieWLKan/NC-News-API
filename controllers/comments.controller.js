const { selectCommentsByArticleId } = require("../models/comments.model")

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params

  if (isNaN(article_id)) {
    return res.status(400).send({ msg: "Invalid article ID" });
  }

  selectCommentsByArticleId(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        res.status(404).send({ msg: "Article not found or has no comments" })
      } else {
        res.status(200).send({ comments })
      }
    })
    .catch(next)
}

module.exports = { getCommentsByArticleId }