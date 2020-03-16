import React, { Suspense } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import routes from '@/routes'
import customMenu from '@/constants/menu'
import { ICustomMenu } from '@/interface/global'

import LayoutSider from './sider'
import LayoutHeader from './header'
import LayoutFooter from './footer'

const { Content } = Layout

export default function DefaultLayout() {
  const history = useHistory()
  const [menu, setMenu] = React.useState<ICustomMenu>(customMenu)
  const [menuToggle, setMenuToggle] = React.useState(true)

  const handleMenuToggleClick = React.useCallback(() => {
    setMenuToggle(!menuToggle)
  }, [menuToggle])

  React.useEffect(() => {
    const cacheUserName = localStorage.getItem('username')
    const cacheToken = localStorage.getItem('token')
    if (!cacheUserName || !cacheToken) {
      history.push('/login')
      return
    } else {
      let auth
      let filterMenu = customMenu
      try {
        auth = JSON.parse(localStorage.getItem('auth') || '')
      } catch (error) {}
      if (!auth) {
        filterMenu = customMenu.filter(item => !item.auth)
      }
      setMenu(filterMenu)
    }
  }, [history])

  return (
    <Layout style={{ height: '100vh' }}>
      <BackTop />
      <LayoutSider menuToggle={menuToggle} menu={menu} />
      <Layout>
        <LayoutHeader
          menuToggle={menuToggle}
          menuClick={handleMenuToggleClick}
        />
        <Content>
          <Switch>
            {routes.map(item => (
              <Route
                key={item.path}
                path={`/management${item.path}`}
                exact={item.exact}
                render={() => (
                  <Suspense fallback={<div>loading</div>}>
                    <item.component />
                  </Suspense>
                )}
              />
            ))}
            <Redirect to="/404" />
          </Switch>
        </Content>
        {/* <LayoutFooter /> */}
      </Layout>
    </Layout>
  )
}
