const categoryModels = require('../models/categories')
const helpers = require('../helpers/helpers')
const redis = require('redis')
// const client = redis.createClient(6379)

const categories = {
  getCategoryById: (req, res) => {
    const id = req.params.id
    categoryModels.getCategoryById(id)
      .then((result) => {
        if (result != '') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Category not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  getAllCategory: (req, res) => {
    categoryModels.getAllCategory()
      .then((result) => {
        if (result != '') {
          // client.setex('getallcategory', 60 * 60 * 12, JSON.stringify(result))
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, 'Category not found', 404, 'Error')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateCategory: (req, res) => {
    const id = req.params.id
    const { nameCategory } = req.body
    const data = {
      nameCategory
    }
    categoryModels.updateCategory(id, data)
      .then((result) => {
        const resultCategories = result
        console.log(result)
        helpers.response(res, null, resultCategories, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteCategory: (req, res) => {
    const id = req.params.id
    categoryModels.deleteCategory(id)
      .then((result) => {
        if (result != 'Data not found') {
          helpers.response(res, null, result, 200, null)
        } else {
          helpers.response(res, null, result, 404, 'Not Found')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  insertCategory: (req, res) => {
    const { nameCategory } = req.body
    const data = {
      nameCategory
    }
    categoryModels.insertCategory(data)
      .then((result) => {
        console.log(result)
        helpers.response(res, null, result, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = categories
