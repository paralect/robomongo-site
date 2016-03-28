'use strict'

let githubService = require('resources/issues/github.service')
let issueService = require('resources/issues/issue.service')
let voteService = require('resources/votes/vote.service')
let logger = require('logger')

let syncWithGithub = function *() {
  let githubIssues = yield githubService.fetchAllIssues()
  yield issueService.syncWithGithub(githubIssues)
}

module.exports.syncWithGithub = function *() {
  yield syncWithGithub()
  this.body = {}
}

module.exports.list = function *() {
  let query = {'github.state': 'open'}
  let sort = {'github.createdOn': -1}

  let issuesResult = yield issueService.find(query, {sort: sort})

  // fetch all issues from github on a first request
  if (issuesResult.results.length === 0) {
    yield syncWithGithub()

    issuesResult = yield issueService.find(query)
  }
  let currentUserId = this.state.user ? this.state.user._id : null
  issuesResult.results.forEach((item) => {
    if (currentUserId && item.voters && currentUserId in item.voters) {
      item.voted = true
      delete item.voters
    }
  })

  this.body = issuesResult
}

module.exports.githubWebhook = function *() {
  let hook = this.request.body

  let type = this.headers['x-github-event']
  if (!type) {
    this.status = 400
    return
  }
  // TODO: verify webhook
  logger.info("GitHub '" + type + "' hook received")

  switch (type) {
    case 'issues':
    case 'issue_comment':
      let issue = hook.issue
      yield issueService.updateGithubIssue(issue)
      break
    default:
      logger.info(`Uncknown webhook type '${type}', skipping..`)
  }

  this.status = 200
}

voteService.on('created', function (evt) {
  let vote = evt.doc
  issueService.updatePoints(vote.issueId, vote.userId, vote.points)
    .done()
})
