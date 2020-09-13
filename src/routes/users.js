const express = require('express')
const userController = require('../controllers/users')
const router = express.Router()

router
  .post('/registerAdmin', userController.registerAdmin)
  .post('/registerUser', userController.registerUser)
  .post('/loginAdmin', userController.loginAdmin)
  .post('/loginUser', userController.loginUser)

module.exports = router
