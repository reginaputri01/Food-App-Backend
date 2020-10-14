const historyModels = require('../models/histories')
const helpers = require('../helpers/helpers')
const redis = require('redis')
// const client = redis.createClient(6379)

const histories = {
  getHistoryById: (req, res) => {
    const id = req.params.id
    historyModels.getHistoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Data search not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllHistory: (req, res) => {
    historyModels.getAllHistory()
      .then((result) => {
        if (result != '') {
          // client.setex('getallhistory', 60 * 60 * 12, JSON.stringify(result))
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Data search not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateHistory: (req, res) => {
    const id = req.params.id
    const { invoice, cashier, orders, countItem, idProduct } = req.body
    const data = {
      invoice,
      cashier,
      orders,
      countItem,
      idProduct,
      date: new Date()
    }
    historyModels.updateHistory(id, data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteHistory: (req, res) => {
    const id = req.params.id
    historyModels.deleteHistory(id)
      .then((result) => {
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertHistory: (req, res) => {
    const { invoice, cashier, orders, amount } = req.body
    const data = {
      invoice,
      cashier,
      orders,
      amount,
      date: new Date()
    }
    historyModels.insertHistory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = histories
