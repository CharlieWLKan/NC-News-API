const express = require("express")
const app = express()
const getApi = require("./controllers/api.controller")
const {getTopics} = require("./controllers/topics.controller")

app.get("/api", getApi)

app.get("/api/topics", getTopics)

//middleware error handling, not sure if needed yet...
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).send({ msg: 'Internal Server Error' })
})

module.exports = app