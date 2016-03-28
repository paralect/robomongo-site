'use strict'

let controller = require('./vote.controller')
let router = require('koa-router')()

router.post('/', controller.vote)

module.exports = router.routes()
