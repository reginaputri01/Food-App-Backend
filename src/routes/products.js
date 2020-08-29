const express = require('express')
const productsController = require('../controllers/ProductsController')
const { verifyAccess } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router
  .post('/', verifyAccess, upload.single('image'), productsController.insertProduct)
  .get('/', verifyAccess, productsController.getAllProduct)
  .get('/:id', verifyAccess, productsController.getProductById)
  .patch('/:id', verifyAccess, upload.single('image'), productsController.updateProduct)
  .delete('/:id', verifyAccess, productsController.deleteProduct)

module.exports = router
