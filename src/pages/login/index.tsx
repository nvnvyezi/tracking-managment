import * as React from 'react'
import { JSEncrypt } from 'jsencrypt'
import { Link, useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, message, Checkbox, notification } from 'antd'

import * as API from '@/constants/api'
import * as RSA from '@/constants/rsa'

import axios from '@/utils/axios'

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

  const onFinish = ({ username, password, remember }: any) => {
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(RSA.publicKey)
    const rsaPassword = jsencrypt.encrypt(password)
    setLoading(true)

    axios
      .post(API.login, {
        username,
        password: rsaPassword,
        remember,
      })
      .then(res => {
        message.success('登录成功!')
        localStorage.setItem('username', username)
        localStorage.setItem('email', res?.data?.email)
        localStorage.setItem('admin', res?.data?.admin)

        setTimeout(() => {
          history.push('/management/welcome')
        }, 100)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="wrapper">
      <div className="wrapper-icon" />
      <div className="wrapperForm">
        <h3>数据分析管理平台</h3>
        <Form onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item
            name="username"
            rules={[
              { required: true, max: 16, min: 1, message: '用户名格式不对!' },
            ]}
          >
            <Input
              maxLength={16}
              placeholder="用户名"
              style={{ lineHeight: '32px' }}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                message:
                  '密码不能为空且最必须包含一个字母和一个数字且数量在8～16之内',
              },
            ]}
          >
            <Input.Password
              maxLength={16}
              placeholder="密码"
              style={{ lineHeight: '32px' }}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 15 }}>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ marginBottom: 0 }}
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Link to="/register">立即注册</Link>
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%', height: '40px' }}
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
        }
        .wrapper :global(.ant-form-item-control-input-content) {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .wrapper-icon {
          width: 300px;
          height: 300px;
          margin-top: 30px;
          margin-right: 100px;
          background: url(${require('@Images/login.png').default}) no-repeat 0 0 /
            contain;
        }
        .wrapperForm {
          width: 400px;
        }
        h3 {
          margin-bottom: 30px;
          text-align: center;
          font-size: 30px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.65);
        }
      `}</style>
    </div>
  )
}
