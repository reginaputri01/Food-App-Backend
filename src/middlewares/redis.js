const redis = require('redis')
const client = redis.createClient(6379)
const helpers = require('../helpers/helpers')

module.exports = {
  cacheGetAll: (req, res, next) => {
    client.get('getAllCategories', (err, data) => {
      if (err) throw err
      if (data !== null) {
        helpers.response(res, JSON.parse(data), 200)
      } else {
        next()
      }
    })
  },
  cacheGetById: (req, res, next) => {
    client.get('getCategoriesById', (err, data) => {
      if (err) throw err
      if (data !== null) {
        helpers.response(res, JSON.parse(data), 200)
      } else {
        next()
      }
    })
  },
  clearGetAll: (req, res, next) => {
    client.del('getAllCategories')
    next()
  }
}
