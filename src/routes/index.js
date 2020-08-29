const express = require('express')
const routerUsers = require('./users')
const routerProducts = require('./products')
const routerCategories = require('./categories')
const routerHistories = require('./histories')
const router = express.Router()

router
  .use('/users', routerUsers)
  .use('/products', routerProducts)
  .use('/categories', routerCategories)
  .use('/histories', routerHistories)

module.exports = router
