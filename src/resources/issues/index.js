'use strict'

let controller = require('./issue.controller')
let router = require('koa-router')()

router.get('/', controller.list)
router.get('/sync', controller.syncWithGithub)
router.post('/github', controller.githubWebhook)

module.exports = router.routes()
