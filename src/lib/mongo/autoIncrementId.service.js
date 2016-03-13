'use strict'

class AutoIncrementIdService {
  constructor (db) {
    this.COLLECTION_NAME = '__autoIncrementIds'
    this._collection = db.collection(this.COLLECTION_NAME, {})
  }

  getNextId (name) {
    let query = {
      _id: name
    }

    return this._collection.findAndModifyAsync(query, [], {
      $inc: { seq: 1 }
    }, {
      new: true,
      upsert: true
    })
      .then((res) => {
        return res.value.seq
      })
  }
}

module.exports = AutoIncrementIdService
