'use strict'

const Router = require('koa-router')
const webpackRequire = require('webpack.require')
const signinValidator = require('./validators/signin.validator')
const tokenService = require('token.service')
const config = require('config/environment')

let router = new Router()

router.get('/signin', function *() {
  let headerAccountImage = yield webpackRequire.load('./landing/layout/components/header/account.png')
  let headerLogoImage = yield webpackRequire.load('./landing/layout/components/header/robomongo-128x128.png')

  yield this.render('landing/signin/index', {
    data: {
      headerAccountImage: headerAccountImage.path,
      headerLogoImage: headerLogoImage.path,
      active: 'account'
    }
  })
})

router.post('/signin', function *() {
  let data = yield signinValidator(this)
  if (!data.isValid) {
    return
  }

  let token = tokenService.createAuthToken(data.user._id)
  this.cookies.set(config.authCookieName, token, { maxAge: config.authCookieDuration })
  this.body = {}
})

router.get('/signout', function *() {
  this.cookies.set(config.authCookieName, '', { expires: new Date(1) })

  this.redirect('/')
})

module.exports = router.routes()
