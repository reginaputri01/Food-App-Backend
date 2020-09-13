
const express = require('express')
const productController = require('../controllers/products')
const router = express.Router()
const { verifyAccess, verifyAccessAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

router
  .get('/:id', verifyAccess, productController.getProductById)
  .get('/', verifyAccess, productController.getAllProduct)
  .post('/', verifyAccessAdmin, upload, productController.insertProduct)
  .patch('/:id', verifyAccessAdmin, upload, productController.updateProduct)
  .delete('/:id', verifyAccessAdmin, productController.deleteProduct)

module.exports = router