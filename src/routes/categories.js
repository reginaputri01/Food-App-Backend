const express = require('express')
const categoriesController = require('../controllers/CategoriesController')
const { verifyAccess } = require('../middlewares/auth')
const { cacheGetAll, cacheGetById, clearGetAll } = require('../middlewares/redis')
const router = express.Router()

router
  .post('/', verifyAccess, clearGetAll, categoriesController.insertCategories)
  .get('/', verifyAccess, cacheGetAll, categoriesController.getAllCategories)
  .get('/:id', verifyAccess, cacheGetById, categoriesController.getCategoriesById)
  .patch('/:id', verifyAccess, categoriesController.updateCategories)
  .delete('/:id', verifyAccess, categoriesController.deleteCategories)

module.exports = router
