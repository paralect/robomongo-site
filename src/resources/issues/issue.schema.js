'use strict'

const Validator = require('jsonschema').Validator

let v = new Validator()

let labelGithub = {
  'id': '/LabelGithub',
  'type': 'object',
  'properties': {
    'url': { 'type': 'string' },
    'name': { 'type': 'string' },
    'color': { 'type': 'string' }
  }
}

let issueGithub = {
  'id': '/IssueGithub',
  'type': 'object',
  'properties': {
    'id': { 'type': 'string' },
    'title': { 'type': 'string' },
    'number': { 'type': 'number' },
    'state': {'type': 'string'},
    'labels': {
      'type': 'array',
      'items': { '$ref': '/LabelGithub' }
    },
    'url': { 'type': 'string' },
    'description': { 'type': 'string' },
    'commentsCount': { 'type': 'number' },
    'createdOn': {'type': 'date-time'},
    'updatedOn': {'type': 'date-time'},
    'closedOn': {'type': 'date-time'}
  }
}

let issue = {
  'id': '/Issue',
  'type': 'object',
  'properties': {
    '_id': { 'type': 'string' },
    'pointsCount': { 'type': 'number' },
    'github': { '$ref': '/IssueGithub' },
    // users, which vote for the issue. ex.: {'userId': true}
    'userIds': {'type': 'object'}
  },
  'required': ['_id', 'pointsCount', 'github']
}

v.addSchema(issueGithub, '/IssueGithub')
v.addSchema(labelGithub, '/LabelGithub')

module.exports = function (obj) {
  return v.validate(obj, issue)
}
