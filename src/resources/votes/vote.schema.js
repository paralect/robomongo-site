'use strict'

const Validator = require('jsonschema').Validator

let v = new Validator()

let vote = {
  'id': '/Vote',
  'type': 'object',
  'properties': {
    '_id': { 'type': 'string' },
    'userId': { 'type': 'string' },
    'issueId': { 'type': 'string' },
    'createdOn': { 'type': 'date-time' },
    'points': {'type': 'number'}
  },
  'required': ['_id', 'userId', 'issueId', 'createdOn', 'points']
}

v.addSchema(vote, '/Vote')

module.exports = function (obj) {
  return v.validate(obj, vote)
}
