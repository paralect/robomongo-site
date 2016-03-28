'use strict'

const config = require('./environment')
const morgan = require('koa-morgan')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const webpack = require('webpack')
const path = require('path')
const mount = require('koa-mount')
const serve = require('koa-static')
let webpackConfig = require('./../../webpack.config')
let compiler = webpack(webpackConfig)

module.exports = (app) => {
  // Logger
  app.use(morgan.middleware('combined'))
  app.use(cors())
  app.use(bodyParser())
  app.use(require('koa-validate')())
  if (config.serveStatic) {
    app.use(mount('/static', serve(path.join(__dirname, '../static'))))
  } else {
    // Dynamically process static content using webpack
    app.use(require('koa-webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      historyApiFallback: true,
      // Configure hot replacement
      hot: true,
      // The rest is terminal configurations
      quiet: false,
      inline: true,
      stats: {
        colors: true
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }))
  }

  app.use(views(path.join(__dirname, './../pages'), {
    default: 'html',
    map: {'html': 'swig'}
  }))

  app.use(function *(next) {
    try {
      yield next
    } catch (err) {
      console.log(err)
      this.status = err.status || 500
      this.body = err.message
      this.app.emit('error', err, this)
    }
  })

  require('./routes')(app)
}
