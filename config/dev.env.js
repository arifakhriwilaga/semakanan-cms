var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST_URL: '"https://private-anon-b58b52f713-sekampus.apiary-mock.com/admin"'
})
