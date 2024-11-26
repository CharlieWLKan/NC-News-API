const express = require("express")
const app = express()
const getApi = require("./controllers/api.controller")
const {getTopics} = require("./controllers/topics.controller")
const {getArticleById, getArticles} = require("./controllers/articles.controller")

app.get("/api", getApi)
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles", getArticles)

//middleware error handling, not sure if needed yet...
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).send({ msg: 'Internal Server Error' })
})

module.exports = app