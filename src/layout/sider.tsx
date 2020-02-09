import React from 'react'
import { Layout, Icon } from 'antd'

import CustomMenu from '@/components/custom-menu'
import { ICustomMenu } from '@/interface/global'

export interface ILayoutSiderProps {
  menuToggle: boolean
  menu: ICustomMenu
}

const { Sider } = Layout

export default function LayoutSider(props: ILayoutSiderProps) {
  const { menuToggle, menu } = props
  return (
    <Sider collapsed={menuToggle}>
      <div className="logo">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nvnvyezi"
        >
          <Icon type="github" style={{ fontSize: '40px', color: '#fff' }} />
        </a>
      </div>
      <CustomMenu menu={menu}></CustomMenu>
      <style jsx>
        {`
          .logo {
            padding: 40px 0;
            text-align: center;
          }
        `}
      </style>
    </Sider>
  )
}
