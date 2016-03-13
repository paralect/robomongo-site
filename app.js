'use strict'

const config = require('config/environment')
const logger = require('logger')

// Bootstrap server
let app = require('koa')()
require('./src/config/koa')(app)

app.listen(config.port, undefined, () => {
  logger.info('Koa server listening on %d, in %s mode', config.port, config.env)
})

// Expose app
exports = module.exports = app
