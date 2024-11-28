const { selectAllUsers } = require("../models/users.model");

const getUsers = (req, res, next) => {
  selectAllUsers()
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch(next)
      }

module.exports = { getUsers }