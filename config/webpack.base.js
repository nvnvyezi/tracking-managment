const chalk = require('chalk')
const path = require('path')
const WebpackChain = require('webpack-chain')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

const configuration = require('./configuration')

const webpackChain = new WebpackChain()

Object.keys(configuration.ENTRY).forEach(name =>
  webpackChain.entry(name).add(configuration.ENTRY[name]),
)

// webpackChain.entry('main').add(path.resolve(__dirname, '../src/index.tsx'))
/** js */
webpackChain.module
  .rule('js')
  .test(/\.(jsx?|tsx?)$/)
  .exclude.add(/node_modules/)
  .end()
  .use('script')
  .loader('babel-loader')
  .options({
    ...require('./babel-options'),
  })

/** style */
webpackChain.module
  .rule('css')
  .test(/\.(c|le)ss$/)
  .use('style')
  .loader(
    configuration.MODE_DEVELOPMENT
      ? 'style-loader'
      : MiniCssExtractPlugin.loader,
  )
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('less')
  .loader('less-loader')
  .options({
    javascriptEnabled: true,
  })

/** 图片 */
webpackChain.module
  .rule('image')
  .test(/\.(png|jpe?g|svg|gif|webp)/)
  .exclude.add(/node_modules/)
  .end()
  .use('url')
  .loader('url-loader')
  .options({
    limit: 8192,
  })

/** pug */
webpackChain.module
  .rule('pug')
  .test(/\.pug$/)
  .use('pug')
  .loader('pug-loader')

/** plugins */
webpackChain.plugin('html').use(HtmlWebPackPlugin, [
  {
    title: configuration.TITLE,
    meta: configuration.META,
    favicon: configuration.FAVICON,
    template: './public/index.pug',
    hash: true,
    xhtml: true,
  },
])

webpackChain.plugin('progress').use(ProgressBarWebpackPlugin, [
  {
    format: `  build [:bar]  ${chalk.green.bold(
      ':msg :percent',
    )} (:elapsed seconds)`,
    complete: '=',
    incomplete: '',
    clear: false,
  },
])

webpackChain.plugin('dayjs').use(AntdDayjsWebpackPlugin)

webpackChain.plugin('duplicate').use(DuplicatePackageCheckerPlugin)

/** resolve */
/** alias */
Object.keys(configuration.ALIAS).forEach(name => {
  webpackChain.resolve.alias.set(name, configuration.ALIAS[name])
})

/** 用于描述的 JSON 文件 */
webpackChain.resolve.descriptionFiles.add('package.json')

/** 自动解析确定的扩展 */
webpackChain.resolve.extensions
  .add('.ts')
  .add('.tsx')
  .add('.js')
  .add('.jsx')
  .add('.json')

webpackChain.resolve.mainFields
  .add('jsnext:main')
  .add('browser')
  .add('main')

/** 解析目录时要使用的文件名。 */
webpackChain.resolve.mainFiles.add('index')

webpackChain.resolve.modules.add(configuration.MODULES).add('node_modules')

module.exports = webpackChain
