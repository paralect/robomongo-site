'use strict'
const jwt = require('jsonwebtoken')
const config = require('./config/environment')
const logger = require('logger')

module.exports.createAuthToken = function (userId) {
  var payload = {
    _id: userId
  }

  return jwt.sign(payload, config.jwtSecret, {})
}

module.exports.decodeToken = function (token) {
  var res = null
  // invalid token - synchronous
  try {
    res = jwt.verify(token, config.jwtSecret)
  } catch (err) {
    logger.warn('Invalid json web token', err)
  }

  return res
}
