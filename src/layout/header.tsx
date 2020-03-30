import * as React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Menu, Dropdown, Layout, Avatar } from 'antd'
import {
  EditOutlined,
  UserOutlined,
  SettingFilled,
  GithubOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

import avatar from '@Images/user.jpg'

import '@/style/layout.less'

const { Header } = Layout

export interface ILayoutHeaderProps {
  menuToggle: boolean
  menuClick: () => void
}

function LayoutHeader(props: ILayoutHeaderProps) {
  const { menuClick, menuToggle } = props
  const history = useHistory()

  function handleLoginOut() {
    const username = localStorage.getItem('username')
    axios.delete(API.userStatus, { data: { username } }).then(() => {
      localStorage.clear()
      history.replace('/login')
    })
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
          <Link to="/management/user/own">
            <EditOutlined style={{ marginRight: 8 }} />
            个人设置
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SettingFilled />
          系统设置
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item onClick={handleLoginOut}>
        <LogoutOutlined /> 退出登录
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nvnvyezi"
        >
          <GithubOutlined style={{ color: '#000' }} />
        </a>
        <Dropdown overlay={userMenu}>
          <span className="user">
            <Avatar src={avatar} icon={UserOutlined} />
            <span className="name">
              {localStorage.getItem('username') || '游客007'}
            </span>
          </span>
        </Dropdown>
      </div>
      <style jsx>{`
        .wrapper-user {
          display: flex;
          align-items: center;
        }
        .wrapper-user > a {
          display: inline-block;
          margin-right: 20px;
        }
        .user {
          cursor: pointer;
        }
        .name {
          margin-left: 20px;
          letter-spacing: 2px;
        }
      `}</style>
    </Header>
  )
}

export default React.memo(LayoutHeader)
