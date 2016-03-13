'use strict'

let pagedFind = require('./pagedFind')
let EventEmitter = require('events').EventEmitter

class BaseQueryService extends EventEmitter {
  constructor (collection, options) {
    super()
    this._collection = collection
    this._options = options || {}
  }

  get name () {
    return this._collection.name
  }

  find (query, options) {
    options = options || {}
    return pagedFind(this._collection, query, options)
  }

  findOne (query, options) {
    return this.find(query, options)
      .then((data) => {
        if (data.results.length > 1) {
          throw new Error(`findOne: More than one document return for query ${query}`)
        }
        return data.results.length === 1 ? data.results[0] : null
      })
  }

  count (query, options) {
    return this._collection.countAsync(query)
  }

  exists (query, options) {
    return this.count(query)
      .then((count) => {
        return count > 0
      })
  }

  aggregate (query) {
    return this._collection.aggregateAsync(query)
  }
}

module.exports = BaseQueryService
