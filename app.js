const express = require("express")
const app = express()
app.use(express.json())

const getApi = require("./controllers/api.controller")
const {getTopics} = require("./controllers/topics.controller")
const {getArticleById, getArticles} = require("./controllers/articles.controller")
const { getCommentsByArticleId, postCommentByArticleId } = require("./controllers/comments.controller")

app.get("/api", getApi)
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)
app.post("/api/articles/:article_id/comments", postCommentByArticleId)

//middleware error handling, not sure if needed yet...
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" })
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Resource not found" })
  } else {
    next(err)
  }
});

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app