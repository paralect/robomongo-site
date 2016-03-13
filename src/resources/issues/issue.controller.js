'use strict'

let githubService = require('resources/issues/github.service')
let issueService = require('resources/issues/issue.service')

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

  let issuesResult = yield issueService.find(query)

  // fetch all issues from github on a first request
  if (issuesResult.results.length === 0) {
    yield syncWithGithub()

    issuesResult = yield issueService.find(query)
  }

  this.body = issuesResult
}
