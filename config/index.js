'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    autoOpenBrowser: false,
    cacheBusting: true,
    cssSourceMap: true,
    devtool: 'cheap-module-eval-source-map',
    errorOverlay: true,
    host: 'localhost',
    notifyOnErrors: true,
    poll: false,
    port: 8080,
    proxyTable: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    showEslintErrorsInOverlay: false,
    useEslint: true
  },
  build: {
    assetsPublicPath: '/',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    bundleAnalyzerReport: process.env.npm_config_report,
    devtool: '#source-map',
    index: path.resolve(__dirname, '../dist/index.html'),
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    productionSourceMap: true
  }
}
