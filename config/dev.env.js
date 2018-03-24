'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  API_ROOT: '"/api"',
  NODE_ENV: '"development"',
  VUE_DEVTOOLS: 'true'
})
