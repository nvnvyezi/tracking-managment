import axios from 'axios'
import { message } from 'antd'

const instance = axios.create({
  timeout: 5000,
  // baseURL: 'http://127.0.0.1:8001/',
})

// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 将 token 添加到请求头
    try {
      const token = JSON.parse(localStorage.getItem('token') || '')
      token && (config.headers.authorization = token)
    } catch (error) {}
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200 && response.statusText === 'OK') {
      const { authorization } = response.headers
      try {
        if (authorization) {
          localStorage.setItem('token', JSON.stringify(authorization))
        }
      } catch (error) {
        console.log(`authorization store error`, error)
      }
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    const { response } = error
    let msg = '接口错误'

    // 相应错误处理
    // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
    switch (response.status) {
      case 401:
        msg = '身份验证失败'
        break
      case 403:
        msg = response.data.msg
        break
      case 404:
        break
      case 500:
        break
      default:
        msg = '其他错误信息'
    }
    message.error(msg)
    return Promise.reject(error)
  },
)

export default instance
