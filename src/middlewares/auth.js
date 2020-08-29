const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')
module.exports = {
  verifyAccess: (req, res, next) => {
    let token = req.headers.authorization
    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) return helper.response(res, { message: 'token invalid' }, 403)
      next()
    })
  }
}
