'use strict'

/**
 *  Validate request and send 400(bad request), when request is not valid
 */
module.exports = function *(koa, validateFn) {
  koa.errors = []
  let data = yield validateFn(koa)
  data.isValid = koa.errors.length === 0
  if (!data.isValid) {
    koa.body = { errors: koa.errors }
    koa.status = 400
  }

  return data
}
