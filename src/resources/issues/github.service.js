'use strict'

const GithubApi = require('github')
const config = require('config/environment')
const Promise = require('bluebird')

let github = new GithubApi({
  version: '3.0.0',
  debug: true,
  timeout: 5000,
  protocol: 'https'
})

Promise.promisifyAll(github.issues)

let authenticate = function *() {
  return github.authenticate({
    type: 'oauth',
    key: config.github.clientId,
    secret: config.github.clientSecret
  })
}

module.exports.fetchAllIssues = function *() {
  yield authenticate()

  let amountPerPage = 100
  let page = 1
  let issues = []
  while (page !== 0) {
    let res = yield github.issues.repoIssuesAsync({
      user: config.github.repoOwner,
      repo: config.github.repoName,
      page: page,
      per_page: amountPerPage,
      state: 'open'
    })

    issues = issues.concat(res)

    // stop fetching when loaded issues size is less than per_page size
    page = res.length < amountPerPage ? 0 : (page + 1)
  }

  return issues
}
