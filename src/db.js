'use strict'

const config = require('config/environment')
let logger = require('logger')
let db = require('lib/mongo')(logger, config.mongo.connection)

module.exports = db
