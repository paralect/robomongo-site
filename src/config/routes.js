'use strict'

const Router = require('koa-router')
const mount = require('koa-mount')
let indexRouter = new Router()

indexRouter
  // match all routes but not files (i.e. routes with dots)
  .get(/^((?!\.).)*$/, function *() {
    yield this.render('react-layout/index', { })
  })

module.exports = function (app) {
  app.use(mount('/api/v1/issues', require('resources/issues')))

  app.use(indexRouter.routes())
}
