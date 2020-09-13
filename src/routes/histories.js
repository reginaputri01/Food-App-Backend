const express = require('express')
const historyController = require('../controllers/histories')
const router = express.Router()
const { verifyAccess, verifyAccessAdmin } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

router
  .get('/:id', verifyAccess, historyController.getHistoryById)
  .get('/', verifyAccess, historyController.getAllHistory)
  .post('/', verifyAccessAdmin, upload, historyController.insertHistory)
  .patch('/:id', verifyAccessAdmin, upload, historyController.updateHistory)
  .delete('/:id', verifyAccessAdmin, historyController.deleteHistory)
  
module.exports = router
