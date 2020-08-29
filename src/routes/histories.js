const express = require('express')
const historiesController = require('../controllers/HistoriesController')
const router = express.Router()

router
  .post('/', historiesController.insertHistories)
  .get('/', historiesController.getAllHistories)
  .get('/:id', historiesController.getHistoriesById)
  .patch('/:id', historiesController.updateHistories)
  .delete('/:id', historiesController.deleteHistories)

module.exports = router
