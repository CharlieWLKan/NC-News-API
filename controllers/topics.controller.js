const {selectTopics} = require("../models/topics.model")

const getTopics = (req, res, next) =>{
  selectTopics().then((data) => {
  res.status(200).send({ topics: data })
})
}

module.exports = { getTopics }