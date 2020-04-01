import * as React from 'react'
import { JSEncrypt } from 'jsencrypt'
import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'

import * as API from '@/constants/api'
import * as RSA from '@/constants/rsa'

import axios from '@/utils/axios'

export default function Login() {
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

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

  const onFinish = ({ username, password, passwordAgain, email }: any) => {
    if (password !== passwordAgain) {
      message.error('两次密码不一致！')
      return
    }
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(RSA.publicKey)
    const rsaPassword = jsencrypt.encrypt(password)
    setLoading(true)

    axios
      .post(API.register, {
        email,
        username,
        password: rsaPassword,
      })
      .then(() => {
        message.success('注册成功!')
        setTimeout(() => {
          history.push('/login')
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
        <h3>用户注册</h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                min: 1,
                max: 16,
                required: true,
                whitespace: true,
                message: '用户名格式不对!',
              },
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
            rules={[
              {
                required: true,
                whitespace: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                message:
                  '密码不能为空且最必须包含一个字母和一个数字且数量在8～16之内',
              },
            ]}
          >
            <Input.Password
              maxLength={16}
              placeholder="密码"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            rules={[
              {
                required: true,
                message:
                  '密码不能为空且最必须包含一个字母和一个数字且数量在8～16之内',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('两次密码不一致!')
                },
              }),
            ]}
          >
            <Input.Password
              maxLength={16}
              placeholder="再次输入密码"
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                whitespace: true,
                message: '邮箱格式不对!',
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
              },
            ]}
          >
            <Input
              maxLength={16}
              placeholder="邮箱"
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 5 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              注册
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
