const { selectArticleById, updateArticleVotes, selectAllArticles } = require("../models/articles.model");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      if (err.status) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        next(err);
      }
    });
};

const updateArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;


  if (typeof inc_votes !== 'number') {
    return res.status(400).send({ msg: "inc_votes must be a number" });
  }

  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).send({ msg: "Article not found" });
      }
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next)
};

const getArticles = (req, res, next) => {
  selectAllArticles()
    .then((articles) => {
      res.status(200).send({ articles })
    })
    .catch((err) => {
      next(err)
    })
};

module.exports = { getArticleById, getArticles, updateArticleById };
