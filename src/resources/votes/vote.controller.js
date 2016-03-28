'use strict'

let voteService = require('resources/votes/vote.service')
let voteValidator = require('resources/votes/validators/vote.validator')

module.exports.vote = function *() {
  let data = yield voteValidator(this)
  if (!data.isValid) {
    return
  }

  let voteResult = yield voteService.vote(data.issueId, data.userId, data.points)

  this.body = voteResult
}
