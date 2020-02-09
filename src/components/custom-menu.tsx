import * as React from 'react'
import { Menu, Icon } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { ICustomMenu, ICustomMenuItem } from '@/interface/global'

export interface ICustomMenuProps {
  menu: ICustomMenu
}

export default function CustomMenu(props: ICustomMenuProps) {
  const { menu = [] } = props
  const { pathname } = useLocation()

  const [selectedKeys, setSelectedKeys] = React.useState<[string]>(['/'])

  // 页面刷新的时候可以定位到 menu 显示
  React.useEffect(() => {
    setSelectedKeys([pathname])
  }, [pathname])

  // // 点击面包屑导航时 侧边栏同步响应
  // componentDidUpdate(prevProps, prevState) {
  //   let { pathname } = this.props.location
  //   if (prevProps.location.pathname !== pathname) {
  //     this.setState({
  //       selectedKeys: [pathname],
  //       openKeys: this.getOpenKeys(pathname),
  //     })
  //   }
  // }

  function renderMenuItem({ key, icon, title }: ICustomMenuItem) {
    return (
      <Menu.Item key={key}>
        <Link to={key}>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  // 循环遍历数组中的子项 subs ，生成子级 menu
  function renderSubMenu({ key, icon, title, subs }: ICustomMenuItem) {
    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon && <Icon type={icon} />}
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
