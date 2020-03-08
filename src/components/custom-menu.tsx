import * as React from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { ICustomMenu, ICustomMenuItem } from '@/interface/global'

export interface ICustomMenuProps {
  menu: ICustomMenu
}

export default function CustomMenu({ menu = [] }: ICustomMenuProps) {
  const { pathname } = useLocation()

  const [selectedKeys, setSelectedKeys] = React.useState<[string]>(['/'])

  // 页面刷新的时候可以定位到 menu 显示
  React.useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  function renderMenuItem({ key, Icon, title }: ICustomMenuItem) {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {Icon && <Icon />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  // 循环遍历数组中的子项 subs ，生成子级 menu
  function renderSubMenu({ key, Icon, title, subs }: ICustomMenuItem) {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {Icon && <Icon />}
            <span>{title}</span>
          </span>
        }
      >
        {subs?.map(item =>
          !!item.subs?.length ? renderSubMenu(item) : renderMenuItem(item),
        )}
      </Menu.SubMenu>
    )
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      onClick={({ key }) => setSelectedKeys([key])}
    >
      {menu.map(item =>
        !!item.subs?.length ? renderSubMenu(item) : renderMenuItem(item),
      )}
    </Menu>
  )
}
