'use strict'

const Router = require('koa-router')
const mount = require('koa-mount')
const jwt = require('jsonwebtoken')
const config = require('config/environment')
const logger = require('logger')
const userService = require('user.service')
let indexRouter = new Router()

let getToken = (koa) => {
  let authHeader = koa.headers['authorization']
  return koa.cookies.get(config.authCookieName) ||
    koa.query[config.authCookieName] ||
    (authHeader ? authHeader.replace('Bearer: ', '') : null)
}

indexRouter
  // match all routes but not files (i.e. routes with dots)
  .get(/^((?!\.).)*$/, function *() {
    let data = {points: 0, token: ''}
    if (this.state.user) {
      data = {
        points: this.state.user.points,
        token: getToken(this)
      }
    }
    yield this.render('react-layout/index', data)
  })

let authMiddleware = function *(next) {
  let token = getToken(this)
  if (!token) {
    yield next
    return
  }

  let decodedToken = null
  // invalid token - synchronous
  try {
    decodedToken = jwt.verify(token, config.jwtSecret)
  } catch (err) {
    logger.warn('Invalid json web token', err)
  }
  if (decodedToken) {
    this.state.user = yield userService.findOne({_id: decodedToken._id})
  }

  yield next
}

module.exports = function (app) {
  app.use(authMiddleware)
  app.use(mount('/api/v1/issues', require('resources/issues')))
  app.use(mount('/api/v1/votes', require('resources/votes')))

  app.use(mount('/', require('pages/landing/signin/routes')))

  app.use(indexRouter.routes())
}
