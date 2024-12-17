const express = require("express")
const app = express()
app.use(express.json())
const cors = require('cors')

const getApi = require("./controllers/api.controller")
const {getTopics} = require("./controllers/topics.controller")
const {getArticleById, getArticles, updateArticleVotes} = require("./controllers/articles.controller")
const { getCommentsByArticleId, postCommentByArticleId, deleteComment } = require("./controllers/comments.controller")
const { getUsers } = require("./controllers/users.controller")
const { updateArticleById } = require("./controllers/articles.controller")

app.get("/api", getApi)
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)
app.post("/api/articles/:article_id/comments", postCommentByArticleId),
app.delete("/api/comments/:comment_id", deleteComment)
app.get("/api/users", getUsers)
app.patch("/api/articles/:article_id", updateArticleById)
app.use(cors())

//middleware error handling, not sure if needed yet...
app.use((err, req, res, next) => {
  if (err.code === "22P02") { // Invalid input
    res.status(400).send({ msg: "Invalid input" });
  } else if (err.code === "23503") { // Foreign key
    res.status(404).send({ msg: "Resource not found" });
  } else if (err.status && err.msg) { // Custom errors
    res.status(err.status).send({ msg: err.msg });
  } else { // Catch-all for unexpected errors
    console.error("Unexpected error:", err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});
module.exports = app