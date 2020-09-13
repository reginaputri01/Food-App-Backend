const connection = require('../configs/db')

const categories = {
  getCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getAllCategory: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateCategory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE category SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update Category Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM category WHERE id = ?', id, (err, result) => {
        if (!err) {
          if (result != '') {
            resolve('ID Category Already Exists')
          } else {
            connection.query('DELETE FROM category WHERE id = ?', id, (err, result) => {
              if (!err) {
                if (result.affectedRows != 0) {
                  resolve('Delete Category Success')
                } else {
                  resolve('ID Category Not Found')
                }
              } else {
                reject(new Error(err))
              }
            })
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertCategory: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO category SET ?', data, (err, result) => {
        if (!err) {
          resolve('Add Category Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = categories
