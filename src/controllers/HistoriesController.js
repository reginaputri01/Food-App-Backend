const historiesModel = require('../models/HistoriesModel')
const helper = require('../helpers/helpers')

const histories = {
  insertHistories: (req, res) => {
    const { invoice, cashier, orders, amount } = req.body
    const data = {
      invoice,
      cashier,
      date: new Date(),
      orders,
      amount
    }
    historiesModel.insertHistories(data)
      .then((result) => {
        const resultHistories = result
        console.log(result)
        helper.response(res, resultHistories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllHistories: (req, res) => {
    historiesModel.getAllHistories()
      .then((result) => {
        const resultHistories = result
        helper.response(res, resultHistories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getHistoriesById: (req, res) => {
    const id = req.params.id
    historiesModel.getHistoriesById(id)
      .then((result) => {
        const resultHistories = result
        helper.response(res, resultHistories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateHistories: (req, res) => {
    const id = req.params.id
    const { invoice, cashier, orders, amount } = req.body
    const data = {
      invoice,
      cashier,
      date: new Date(),
      orders,
      amount
    }
    historiesModel.updateHistories(id, data)
      .then((result) => {
        const resultHistories = result
        console.log(result)
        helper.response(res, resultHistories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteHistories: (req, res) => {
    const id = req.params.id
    historiesModel.deleteHistories(id)
      .then((result) => {
        const resultHistories = result
        helper.response(res, resultHistories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = histories
