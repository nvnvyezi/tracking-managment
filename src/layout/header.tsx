import * as React from 'react'
import { Menu, Dropdown, Layout, Avatar, Badge } from 'antd'
import {
  EditOutlined,
  BellOutlined,
  UserOutlined,
  SettingFilled,
  GithubOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import avatar from '@Images/user.jpg'

import '@/style/layout.less'

const { Header } = Layout

export interface ILayoutHeaderProps {
  menuToggle: boolean
  menuClick: () => void
}

function LayoutHeader(props: ILayoutHeaderProps) {
  const { menuClick, menuToggle } = props

  let userName = ''
  try {
    userName = JSON.parse(localStorage.getItem('username') || '游客')
  } catch (error) {}

  function handleLoginOut() {
    localStorage.clear()
    //     this.props.history.push('/login')
    //     message.success('登出成功!')
  }

  const menuProps = {
    onClick: menuClick,
    style: {
      fontSize: '20px',
    },
  }

  const userMenu = (
    <Menu>
      <Menu.ItemGroup title="用户设置">
        <Menu.Divider />
        <Menu.Item>
          <EditOutlined />
          个人设置
        </Menu.Item>
        <Menu.Item>
          <SettingFilled />
          系统设置
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item>
        <span role="button" onClick={handleLoginOut}>
          <LogoutOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="layout-header">
      {menuToggle ? (
        <MenuUnfoldOutlined {...menuProps} />
      ) : (
        <MenuFoldOutlined {...menuProps} />
      )}
      <div className="wrapper-user">
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ltadpoles/react-admin"
          >
            <GithubOutlined style={{ color: '#000' }} />
          </a>
        </div>
        <div>
          <Badge dot={true} offset={[-2, 0]}>
            <a href="https://github.com/ltadpoles/react-admin">
              <BellOutlined />
            </a>
          </Badge>
        </div>

        <Dropdown overlay={userMenu}>
          <span>
            <Avatar
              icon={UserOutlined}
              src={avatar}
              alt="avatar"
              style={{ cursor: 'pointer', backgroundColor: '#f4f5f6' }}
            />
            <span className="name">{userName}</span>
          </span>
        </Dropdown>
      </div>
      <style jsx>{`
        .wrapper-user {
          display: flex;
          align-items: center;
        }
        .wrapper-user > div {
          margin-right: 15px;
        }
        .name {
          margin-left: 10px;
          cursor: pointer;
        }
      `}</style>
    </Header>
  )
}

export default React.memo(LayoutHeader)
