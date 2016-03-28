'use strict'
let webpackRequire = require('webpack-require')
let Promise = require('bluebird')
let path = require('path')
let glob = require('glob')
let base = path.join(__dirname, './pages')

let load = function (modulePath) {
  let originalPath = modulePath
  modulePath = path.join(base, modulePath)
  return new Promise((resolve, reject) => {
    webpackRequire(
      require('../webpack.config.js'),
      require.resolve(modulePath),
      function (err, factory, stats, fs) {
        if (err) {
          reject(err)
        }
        let m = factory()
        resolve({
          relativePath: originalPath,
          fullPath: modulePath,
          path: m
        })
      }
    )
  })
}

let getWebpackImagesMap = function () {
  // options is optional
  let files = glob.sync('**/*.png', {cwd: base})
  let promise = Promise.resolve()
  let map = {}
  files.forEach((item) => {
    promise = promise.then(() => {
      return load(item)
    })
      .then((res) => {
        let name = res.relativePath.replace(/\//g, '_')
        map[name] = res.path
      })
  })

  return promise
    .then(() => {
      return map
    })
}

module.exports.getWebpackImagesMap = getWebpackImagesMap
module.exports.load = load
