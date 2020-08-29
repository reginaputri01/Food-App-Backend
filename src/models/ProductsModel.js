const connection = require('../configs/db')

const product = {
  insertProduct: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO products SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllProduct: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT products.*, category.nameCategory FROM products INNER JOIN category ON idCategory = category.id', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT products.*, category.nameCategory FROM products INNER JOIN category ON products.idCategory = category.id WHERE products.id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  paginationProduct: (page) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM products LIMIT 3 OFFSET ${(page - 1) * 3}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  sortProduct: (sort) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM products ORDER BY ${sort}`, sort, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  searchProductName: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM products where name LIKE '%${name}%'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE products SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM products WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = product
