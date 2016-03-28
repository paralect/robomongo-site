'use strict'

const moment = require('moment')
let db = require('./../../db')
let service = db.createService('issues', require('./issue.schema'))

let mapIssueFromGithub = (issue, githubIssue) => {
  issue._id = githubIssue.id.toString()
  issue.pointsCount = issue.pointsCount || 0
  issue.github = {
    title: githubIssue.title,
    number: githubIssue.number,
    url: githubIssue.html_url,
    state: githubIssue.state,
    labels: githubIssue.labels,
    createdOn: moment(githubIssue.created_at).toDate(),
    updatedOn: moment(githubIssue.updated_at).toDate(),
    closedOn: moment(githubIssue.closed_at).toDate(),
    description: githubIssue.body,
    commentsCount: githubIssue.comments
  }

  return issue
}

service.syncWithGithub = function *(issues) {
  for (let i = 0, issuesLength = issues.length; i < issuesLength; i++) {
    let issue = issues[i]
    let exists = yield service.exists({_id: issue.id.toString()})
    if (exists) {
      yield service.update({_id: issue.id.toString()}, (doc) => {
        mapIssueFromGithub(doc, issue)
      })
    } else {
      yield service.create(mapIssueFromGithub({}, issue))
    }
  }

  return {}
}

service.updateGithubIssue = function *(issue) {
  let exists = yield service.exists({_id: issue.id.toString()})
  if (exists) {
    yield service.update({_id: issue.id.toString()}, (doc) => {
      mapIssueFromGithub(doc, issue)
    })
  } else {
    yield service.create(mapIssueFromGithub({}, issue))
  }
}

service.updatePoints = function (issueId, userId, points) {
  let voters = {}
  voters[`voters.${userId}`] = true
  let update = {
    $inc: {
      pointsCount: points
    },
    $set: voters
  }
  return service.atomicUpdate({_id: issueId}, update)
}

module.exports = service
