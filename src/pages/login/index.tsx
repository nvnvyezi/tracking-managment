import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { JSEncrypt } from 'jsencrypt'
import {
  Icon,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  message,
  notification,
} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import axios from '@/utils/axios'
import * as API from '@/constants/api'
import * as RSA from '@/constants/rsa'

interface ILoginProps {
  form: WrappedFormUtils
}

interface ILoginAxios {
  username: string
  remember: boolean
  status: boolean
}

function Login(props: ILoginProps) {
  const {
    form: { getFieldDecorator, validateFields },
  } = props
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    notification.open({
      message: '欢迎使用后台管理平台',
      duration: null,
      description: '账号 admin(管理员) 其他(游客) 密码随意',
    })
    return () => {
      notification.destroy()
    }
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
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
            localStorage.setItem('username', JSON.stringify(res.data?.username))
            message.success('登录成功!')
            history.push('/home')
          })
          .catch(err => {
            setLoading(false)
            message.error(err.message)
          })
        // 这里可以做权限校验 模拟接口返回用户权限标识
        // switch (values.username) {
        //   case 'admin':
        //     values.auth = 0
        //     break
        //   default:
        //     values.auth = 1
        // }
        // localStorage.setItem('user', JSON.stringify(values))
        // enterLoading()
        // timer = setTimeout(() => {
        //   message.success('登录成功!')
        //   props.history.push('/')
        // }, 2000)
      }
    })
  }

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <h3>后台管理系统</h3>
        <Divider />
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, max: 16, min: 1, message: '用户名格式不对!' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />
                }
                maxLength={16}
                placeholder="用户名"
                style={{ height: 32 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, max: 16, min: 6, message: '请输入密码' },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />
                }
                maxLength={16}
                type="password"
                placeholder="密码"
                style={{ height: 32 }}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
            <Link to="/registry" style={{ float: 'right' }}>
              立即注册
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%', marginTop: '5px' }}
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
          border-radius: 5px;
          box-shadow: 0px 2px 13px 0px rgba(228, 228, 228, 0.6);
          background-color: #fff;
        }
      `}</style>
    </div>
  )
}

export default Form.create()(Login)
// export default withRouter(Form.create()(Login))
