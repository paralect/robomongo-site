/*eslint no-console:0 */
'use strict'
require('core-js/fn/object/assign')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')
const open = require('open')

new WebpackDevServer(webpack(config), {
  publicPath: '/static/',
  contentBase: './src/pages/react-layout/',
  historyApiFallback: true,
  // Configure hot replacement
  hot: true,
  // The rest is terminal configurations
  quiet: false,
  noInfo: true,
  inline: true,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})
  .listen(config.port, 'localhost', (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Listening at localhost:' + config.port)
    console.log('Opening your system browser...')
    open('http://localhost:' + config.port + '/webpack-dev-server/')
  })
