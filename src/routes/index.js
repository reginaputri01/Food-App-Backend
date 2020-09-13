const express = require('express')
const productsRoutes = require('./products')
const historiesRouters = require('./histories')
const categoriesRouters = require('./categories')
const usersRouters = require('./users')
const router = express.Router()

router
  .use('/products', productsRoutes)
  .use('/histories', historiesRouters)
  .use('/categories', categoriesRouters)
  .use('/users', usersRouters)

module.exports = router
