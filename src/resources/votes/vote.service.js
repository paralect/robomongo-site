'use strict'

let db = require('./../../db')
let service = db.createService('votes', require('./vote.schema'))

service.vote = function (issueId, userId, points) {
  return service.create({
    userId: userId,
    issueId: issueId,
    createdOn: new Date(),
    points: points
  })
}

module.exports = service
