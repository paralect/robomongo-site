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
  github: {
    webhookSecret: 'robomongo_f@rever',
    clientId: 'e61e7dd7c0d9006d93c2',
    clientSecret: '7fb3ad13955315138535683a483f817c70b5df90',
    repoName: 'robomongo',
    repoOwner: 'paralect',
    webhookSecret: 'robomongo_f@rever'
  }
  secret: 'production_KdShDBm6WkTryRqT6uEd',
  stripe: {
    secretKey: 'sk_test_Hd9suqDfUlOK85rvOCqJBHgv'
  }
}
