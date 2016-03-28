'use strict'

let baseValidator = require('resources/base.validator')
let userService = require('user.service')
let securityUtil = require('resources/securityUtil')

let validate = function *(koa) {
  koa.checkBody('password')
    .trim()
    .notEmpty('Password is required')

  koa.checkBody('email')
    .notEmpty()
    .trim()
    .toLow()
    .isEmail('Email is required')

  if (koa.errors.length > 0) {
    return {}
  }
  let email = koa.request.body.email
  let password = koa.request.body.password

  let user = yield userService.findOne({email: email})
  if (!user) {
    koa.errors.push({'msg': 'Invalid email or password'})
    return {}
  }

  if (!user.emailVerifiedOn) {
    koa.errors.push({'msg': 'Please, verify your email or signup again.'})
    return {}
  }

  let isPasswordValid = yield securityUtil.compareTextWithHash(password, user.passwordHash)
  if (!isPasswordValid) {
    koa.errors.push({'msg': 'Invalid email or password'})
    return {}
  }

  return {
    email: email,
    password: password,
    user: user
  }
}

module.exports = function *(koa) {
  let data = yield baseValidator(koa, validate)
  return data
}
