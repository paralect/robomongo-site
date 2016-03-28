'use strict'

const config = require('config/environment')
const logger = require('logger')

// Bootstrap server
let app = require('koa')()
require('./src/config/koa')(app)

// process all images with webpack in runtime
require('./src/webpack.require').getWebpackImagesMap()
  .then((map) => {
    logger.info('Processed website images with webpack')
  })

app.listen(config.port, undefined, () => {
  logger.info('Koa server listening on %d, in %s mode', config.port, config.env)
})

// Expose app
exports = module.exports = app
