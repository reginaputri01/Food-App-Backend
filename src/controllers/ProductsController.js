const productsModel = require('../models/ProductsModel')
const helper = require('../helpers/helpers')
const helperAddData = require('../helpers/helpersAddData')
const helperUpdateData = require('../helpers/helpersUpdateData')
const helperPagination = require('../helpers/helpersProducts')

const products = {
  insertProduct: (req, res) => {
    console.log(req.file)
    const { name, price, status, idCategory } = req.body
    const data = {
      name,
      price,
      image: `http://localhost:8000/uploads/${req.file.filename}`,
      status,
      idCategory,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    productsModel.insertProduct(data)
      .then((result) => {
        const resultProducts = result
        console.log(result)
        helperAddData.response(res, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getAllProduct: (req, res) => {
    const search = req.query.search
    const sort = req.query.sort
    const page = req.query.page

    if (search) {
      productsModel.searchProductName(search)
        .then((result) => {
          if (result.length < 1) {
            helper.response(res, { message: 'data not found!!' }, 200, null)
          } else {
            helper.response(res, result, 200, null)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (sort) {
      productsModel.sortProduct(sort)
        .then((result) => {
          const resultProducts = result
          helper.response(res, resultProducts, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (page) {
      productsModel.paginationProduct(page)
        .then((result) => {
          const resultProducts = result
          helperPagination.response(res, 200, page, resultProducts.length, resultProducts, null)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      productsModel.getAllProduct()
        .then((result) => {
          const resultProducts = result
          helper.response(res, resultProducts, 200, null)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getProductById: (req, res) => {
    const id = req.params.id
    productsModel.getProductById(id)
      .then((result) => {
        const resultProducts = result
        helper.response(res, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  updateProduct: (req, res) => {
    const id = req.params.id
    const { name, price, status, idCategory } = req.body
    const data = {
      name,
      price,
      image: `http://localhost:8000/uploads/${req.file.filename}`,
      status,
      idCategory,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    productsModel.updateProduct(id, data)
      .then((result) => {
        const resultProducts = result
        console.log(result)
        helperUpdateData.response(res, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteProduct: (req, res) => {
    const id = req.params.id
    productsModel.deleteProduct(id)
      .then((result) => {
        const resultProducts = result
        helper.response(res, resultProducts, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = products
