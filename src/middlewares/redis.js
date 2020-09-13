const redis = require('redis')
const client = redis.createClient(6379)
const helpers = require('../helpers/helpers')

module.exports = {
  cacheGetAllCategory: (req, res, next) => {
    client.get('getAllCategory', (err, data) => {
      if (err) throw err
      if (data !== null) {
        helpers.response(res, null, JSON.parse(data), 200)
      } else {
        next()
      }
    })
  },
  clearGetAllCategory: (req, res, next) => {
    client.del('getAllCategory')
    next()
  }
}
