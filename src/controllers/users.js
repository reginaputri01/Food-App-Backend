const modelUser = require('../models/users')
const helpers = require('../helpers/helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  registerAdmin: (req, res) => {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password,
      roleId: 1
    }

    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.register(data)
          .then((result) => {
            if (result == 'Email is already exists') {
              helpers.response(res, null, result, 403, 'Forbidden')
            } else {
              helpers.response(res, null, 'Register Admin Success', 201, null)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },
  registerUser: (req, res) => {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password,
      roleId: 2
    }
    bcrypt.genSalt(10, function (_err, salt) {
      bcrypt.hash(data.password, salt, function (_err, hash) {
        data.password = hash
        modelUser.register(data)
          .then((result) => {
            if (result == 'Email is already exists') {
              helpers.response(res, null, result, 403, 'Forbidden')
            } else {
              helpers.response(res, null, 'Register User Success', 201, null)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },
  loginAdmin: (req, res) => {
    const { email, password } = req.body
    modelUser.login(email)
    .then((result) => {
      if (result.length < 1) return helpers.response(res, null, 'Email not found!', 401, null)

      const user = result[0]
      const hash = user.password
      bcrypt.compare(password, hash).then((resCompare) => {
        if (!resCompare) return helpers.response(res, null, 'Password wrong!', 401, null)
        const payload = {
          id: user.id,
          email: user.email,
          roleId: user.roleId
        }

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
          user.token = token
          delete user.password
          if (user.roleId !== 1) {
            helpers.response(res, null, 'You are not a admin', 401)
          } else {
            user.roleId = 'Admin'
            helpers.response(res, null, user, 200)
          }
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  },
  loginUser: (req, res) => {
    const { email, password } = req.body
    modelUser.login(email)
    .then((result) => {
      if (result.length < 1) return helpers.response(res, null, 'Email not found!', 401, null)

      const user = result[0]
      const hash = user.password
      bcrypt.compare(password, hash).then((resCompare) => {
        if (!resCompare) return helpers.response(res, null, 'Password wrong!', 401, null)
        const payload = {
          id: user.id,
          email: user.email,
          roleId: user.roleId
        }

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3h' }, (_err, token) => {
          user.token = token
          delete user.password
          if (user.roleId !== 1) {
            user.roleId = 'User'
            helpers.response(res, null, user, 200)
          } else {
            helpers.response(res, null, 'You are not a user', 401)
          }
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }
}
