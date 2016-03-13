'use strict'

let controller = require('./issue.controller')
let router = require('koa-router')()

router.get('/', controller.list)
router.get('/sync', controller.syncWithGithub)

module.exports = router.routes()
