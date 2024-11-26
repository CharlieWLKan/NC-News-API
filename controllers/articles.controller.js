const {selectAllArticles, selectArticleById } = require("../models/articles.model")

const getArticleById = (req, res, next) => {
  const { article_id } = req.params

  if(isNaN(article_id)) {
    return res.status(400).send({msg: "Invalid article ID"})
  }

  selectArticleById(article_id).then((article) => {
    res.status(200).send({article})
  }).catch((err) => {
    if(err.status) {
      res.status(err.status).send({msg: err.msg})
    } else {
      next(err)
    }
  })
}

const getArticles = (req, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = {getArticleById, getArticles}
