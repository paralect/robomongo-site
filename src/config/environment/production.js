'use strict'

module.exports = {
  sendSignupToken: false,
  webHttpSchema: 'https',
  webDomain: 'production-provider.agepath.com',
  consumerDomain: 'production-consumer.agepath.com',
  rootUrl: 'https://production-provider.agepath.com',
  mongo: {
    connection: 'mongodb://admin:fu9hKpRTHXMj@192.241.232.45:27017/agepath-production?authSource=admin'
  },
  secret: 'production_KdShDBm6WkTryRqT6uEd',
  stripe: {
    secretKey: 'sk_test_Hd9suqDfUlOK85rvOCqJBHgv'
  }
}
