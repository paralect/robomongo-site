var Promise = require('bluebird')
var crypto = require('crypto')
var bcrypt = require('bcrypt')
var randomBytes = Promise.promisify(crypto.randomBytes, crypto)
var hash = Promise.promisify(bcrypt.hash, bcrypt)
var compare = Promise.promisify(bcrypt.compare, bcrypt)

module.exports.generateSecureToken = function () {
  return randomBytes(48)
    .then(function (buf) {
      return buf.toString('hex')
    })
}

module.exports.getHash = function (text) {
  return hash(text, 10)
}

module.exports.compareTextWithHash = function (text, hash) {
  return compare(text, hash)
}
