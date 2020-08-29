const categoriesModel = require('../models/CategoriesModel')
const helper = require('../helpers/helpers')
const redis = require('redis')
const client = redis.createClient(6379)

const categories = {
  insertCategories: (req, res) => {
    const { nameCategory, description } = req.body
    const data = {
      nameCategory,
      description
    }
    categoriesModel.insertCategories(data)
      .then((result) => {
        const resultCategories = result
        console.log(result)
        helper.response(res, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllCategories: (req, res) => {
    categoriesModel.getAllCategories()
      .then((result) => {
        const resultCategories = result
        client.setex('getAllCategories', 3600, JSON.stringify(resultCategories))
        helper.response(res, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getCategoriesById: (req, res) => {
    const id = req.params.id
    categoriesModel.getCategoriesById(id)
      .then((result) => {
        const resultCategories = result
        client.setex('getCategoriesById', 3600, JSON.stringify(resultCategories))
        helper.response(res, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateCategories: (req, res) => {
    const id = req.params.id
    const { nameCategory, description } = req.body
    const data = {
      nameCategory,
      description
    }
    categoriesModel.updateCategories(id, data)
      .then((result) => {
        const resultCategories = result
        console.log(result)
        helper.response(res, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteCategories: (req, res) => {
    const id = req.params.id
    categoriesModel.deleteCategories(id)
      .then((result) => {
        const resultCategories = result
        helper.response(res, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = categories
