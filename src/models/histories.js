const connection = require('../configs/db')

const histories = {
  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products INNER JOIN category ON products.idCategory = category.id INNER JOIN history ON history.idProduct = products.id WHERE history.id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllHistory: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM history`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateHistory: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE history SET ? WHERE id = ?', [data, id], (err, result) => {
        if (!err) {
          resolve('Update History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  deleteHistory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM history WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve('Delete History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertHistory: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO history SET ?', data, (err, result) => {
        if (!err) {
          resolve('Add History Success')
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

module.exports = histories
