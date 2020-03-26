import * as React from 'react'
import { JSEncrypt } from 'jsencrypt'
import { Link, useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Checkbox,
  notification,
} from 'antd'

import * as API from '@/constants/api'
import * as RSA from '@/constants/rsa'

import axios from '@/utils/axios'

import './index.less'

interface ILoginAxios {
  status: boolean
  username: string
  remember: boolean
}

export default function Login() {
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    notification.open({
      message: '欢迎使用数据分析管理平台',
      description: '无账号请进行注册或者联系管理员',
    })
  }, [])

  React.useEffect(() => {
    const cacheToken = localStorage.getItem('token')
    const cacheUserName = localStorage.getItem('username')

    if (!cacheToken || !cacheUserName) {
      return
    }

    axios
      .get(API.userStatus, { params: { username: cacheUserName } })
      .then(() => {
        history.replace('/management/welcome')
      })
  }, [history])

  const handleFinish = values => {
    const { username, password, remember } = values
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(RSA.publicKey)
    const rsaPassword = jsencrypt.encrypt(password)
    setLoading(true)

    axios
      .post<ILoginAxios>(API.login, {
        username,
        password: rsaPassword,
        remember,
      })
      .then(res => {
        setLoading(false)
        console.log(res)
        localStorage.setItem('username', username)
        message.success('登录成功!')
        history.push('/management/welcome')
      })
      .catch(err => {
        setLoading(false)
        message.error(err.message)
      })
  }

  const handleFinishFailed = ({ errorFields }: ValidateErrorEntity) => {
    message.error(errorFields?.[0]?.errors?.[0])
  }

  return (
    <div className="wrapper">
      <div className="card-style wrapper-form">
        <h3>后台管理系统</h3>
        <Divider />
        <Form
          onFinish={handleFinish}
          initialValues={{ remember: true }}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, max: 16, min: 1, message: '用户名格式不对!' },
            ]}
          >
            <Input
              maxLength={16}
              placeholder="用户名"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, max: 16, min: 6, message: '请输入密码' }]}
          >
            <Input
              maxLength={16}
              type="password"
              placeholder="密码"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Link to="/registry" style={{ float: 'right' }}>
              立即注册
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: url(${require('@Images/login.jpg').default}) no-repeat 0 0 /
            100% 100%;
        }
        .wrapper-form {
          width: 350px;
          padding: 20px 20px 0;
        }
      `}</style>
    </div>
  )
}
