'use strict'

const _ = require('lodash')
const path = require('path')
const fs = require('fs')

let env = process.env.NODE_ENV || 'development'

let base = {
  env: env,
  serveStatic: true,
  isDev: env === 'development',
  mongo: {
    connection: 'mongodb://localhost:27017/robomongo'
  },
  github: {
    clientId: 'e61e7dd7c0d9006d93c2',
    clientSecret: '7fb3ad13955315138535683a483f817c70b5df90',
    repoName: 'rtest',
    repoOwner: 'anorsich',
    webhookSecret: 'test'
  },
  port: process.env.PORT || 4001,
  jwtSecret: process.env.ROBO_JWT_SECRET || 'robomongo_f@rever',
  authCookieName: 'robo_auth',
  // 1 year
  authCookieDuration: 365 * 24 * 60 * 60 * 1000
}

base = _.merge(base, require(`./${env}.js`) || {})

let loadLocalConfig = (name) => {
  let localConfigPath = path.join(__dirname, name)
  if (fs.existsSync(localConfigPath)) {
    base = _.merge(base, require(localConfigPath))
    console.log(`loaded ${localConfigPath} config`)
  }
}

// local file can be used to customize any config values during development
if (base.env === 'test') {
  loadLocalConfig('test-local.js')
} else {
  loadLocalConfig('local.js')
}

module.exports = base
