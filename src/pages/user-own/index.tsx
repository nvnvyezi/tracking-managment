import * as React from 'react'
import { JSEncrypt } from 'jsencrypt'
import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Card, Form, Input, Button, message } from 'antd'

import * as API from '@/constants/api'
import * as RSA from '@/constants/rsa'

import axios from '@/utils/axios'

import Content from '@/layout/content'

export default function Login() {
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  const onFinish = ({
    email,
    username,
    password,
    passwordOld,
    passwordAgain,
  }: any) => {
    if (password !== passwordAgain) {
      message.error('两次密码不一致！')
      return
    }
    const jsencrypt = new JSEncrypt()
    jsencrypt.setPublicKey(RSA.publicKey)
    const rsaPassword = jsencrypt.encrypt(password)
    const rsaPasswordOld = jsencrypt.encrypt(passwordOld)
    setLoading(true)

    axios
      .patch(API.user, {
        email,
        username,
        password: rsaPassword,
        passwordOld: rsaPasswordOld,
      })
      .then(() => {
        message.success('修改成功')
        localStorage.clear()
        setTimeout(() => {
          history.replace('/login')
        }, 100)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Content crumbData={[{ value: '个人信息' }]}>
      <Card title="个人信息更改">
        <div className="wrapperForm">
          <Form
            onFinish={onFinish}
            style={{ width: 400 }}
            initialValues={{
              email: localStorage.getItem('email'),
              username: localStorage.getItem('username'),
            }}
          >
            <Form.Item name="username">
              <Input
                disabled
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
              />
            </Form.Item>
            <Form.Item
              name="passwordOld"
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
                placeholder="旧密码"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
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
                placeholder="新密码"
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
                    return Promise.reject('两次新密码不一致!')
                  },
                }),
              ]}
            >
              <Input.Password
                maxLength={16}
                placeholder="请再次输入新密码"
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
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
      <style jsx>{`
        .wrapperForm {
          display: flex;
          justify-content: center;
          padding: 100px 0;
        }
      `}</style>
    </Content>
  )
}
