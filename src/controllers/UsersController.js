const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')
const usersModel = require('../models/UsersModel')

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body
    const data = {
      name,
      email,
      password,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(data.password, salt, function (err, hash) {
        data.password = hash
        usersModel.register(data)
          .then((result) => {
            helper.response(res, result, 201, null)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    })
  },
  login: (req, res) => {
    const { email, password } = req.body
    usersModel.getUserByEmail(email)
      .then((result) => {
        if (result.length < 1) {
          return helper.response(res, { message: 'email not found!!' }, 403, null)
        }
        const user = result[0]
        const hash = user.password
        bcrypt.compare(password, hash).then((resCompare) => {
          if (!resCompare) {
            return helper.response(res, { message: 'password wrong !!' }, 403, null)
          }
          const payload = {
            id: user.id,
            email: user.email,
            roleId: user.roleId
          }
          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
            user.token = token
            delete user.password
            delete user.createdAt
            delete user.updatedAt
            helper.response(res, user, 200)
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getUsers: (req, res) => {
    usersModel.getUsers()
      .then((result) => {
        const resultUsers = result
        helper.response(res, resultUsers, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getUserById: (req, res) => {
    const id = req.params.id
    usersModel.getUserById(id)
      .then((result) => {
        const resultUsers = result
        helper.response(res, resultUsers, 200, null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
