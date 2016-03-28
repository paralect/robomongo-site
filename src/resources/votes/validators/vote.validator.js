'use strict'

let baseValidator = require('resources/base.validator')

let validate = function *(koa) {
  koa.checkBody('points').optional()
    .isInt().ge(0)

  koa.checkBody('issueId')
    .isLength(1, 100, 'issueId is required')
  let userId = koa.state.user ? koa.state.user._id : null
  if (!koa.state.user) {
    koa.errors.push({'user': 'Not authorized'})
  }

  return {
    points: koa.request.body.points,
    issueId: koa.request.body.issueId,
    userId: userId
  }
}

module.exports = function *(koa) {
  let data = yield baseValidator(koa, validate)
  return data
}
