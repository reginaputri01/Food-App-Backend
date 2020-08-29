const express = require('express')
const usersController = require('../controllers/UsersController')
const router = express.Router()

router
  .post('/register', usersController.register)
  .post('/login', usersController.login)
  .get('/', usersController.getUsers)
  .get('/:id', usersController.getUserById)

module.exports = router
