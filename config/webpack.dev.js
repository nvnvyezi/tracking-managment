const webpack = require('webpack')

const webpackBase = require('./webpack.base')
const configuration = require('./configuration')

webpackBase.mode('development').devtool('cheap-module-eval-source-map')

webpackBase.devServer
  /** 压缩 */
  .compress(true)
  .headers(configuration.HEADERS)
  .host(configuration.HOST)
  .hot(true)
  // .hotOnly(true)
  .https(configuration.HTTPS)
  .inline(true)
  .open(configuration.OPEN)
  // .port(configuration.PORT)
  .progress(false)
  .proxy(configuration.PROXY)
  .quiet(true)
  .stats(configuration.STATS || 'minimal')

/** 热更新 */
webpackBase.plugin('hot').use(webpack.HotModuleReplacementPlugin)

module.exports = webpackBase
