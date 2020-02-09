const path = require('path')

const resolve = pathStr => path.resolve(__dirname, pathStr)

/** env */
exports.MODE_DEVELOPMENT = process.env.NODE_ENV === 'development'

/** webpack */
exports.ENTRY = {
  main: resolve('../src/index.tsx'),
}
exports.OUTPUT = resolve('../dist/page')
/** resolve modules 路径 */
exports.MODULES = resolve('../src/')
/** 别名 */
exports.ALIAS = {
  '@': resolve('../src'),
  '@Images': resolve('../src/assets/images'),
}

/** devServer */
/** 指定使用一个 host。默认是 localhost */
exports.HOST = ''
exports.PORT = 8000
/** 是否自动打开页面 */
exports.OPEN = false
/** 精确控制要显示的 bundle 信息(只在发生错误或有新的编译时输出)  */
exports.STATS = 'minimal'
/** 代理 */
exports.PROXY = {
  '/api': {
    target: 'http://127.0.0.1:8001',
    // pathRewrite: {'^/api' : ''}
  },
}
/** 在所有响应中添加首部内容 */
exports.HEADERS = {}
/**
 * 可以选择带有 HTTPS 的 HTTP/2 提供服务
 * true 或者
 * {
 *   key: fs.readFileSync('/path/to/server.key'),
 *   cert: fs.readFileSync('/path/to/server.crt'),
 *   ca: fs.readFileSync('/path/to/ca.pem'),
 * }
 */
exports.HTTPS = {}

/** HtmlWebPackPlugin */
/** 添加meta标签 */
exports.META = {}
/** 网页title */
exports.TITLE = 'webpack-scaffold'
/** favicon路径 */
exports.FAVICON = resolve('../public/favicon.ico')
