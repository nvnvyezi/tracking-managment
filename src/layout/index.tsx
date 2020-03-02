import React, { Suspense } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { Layout, BackTop, message } from 'antd'
// import echarts from 'echarts/lib/echarts'
import routes from '@/routes'
import customMenu from '@/constants/menu'
import { ICustomMenu } from '@/interface/global'

import LayoutSider from './sider'
import LayoutHeader from './header'
// import AppFooter from './AppFooter.jsx'

const { Content } = Layout

//   componentDidUpdate() {
//     let { pathname } = this.props.location

//     // 菜单收缩展开时 echarts 图表的自适应
//     if (pathname === '/' || pathname === '/index') {
//       this.timer = setTimeout(() => {
//         echarts.init(document.getElementById('bar')).resize()
//         echarts.init(document.getElementById('line')).resize()
//         echarts.init(document.getElementById('pie')).resize()
//         echarts.init(document.getElementById('pictorialBar')).resize()
//         echarts.init(document.getElementById('scatter')).resize()
//       }, 500)
//     } else {
//       this.timer = null
//     }
//   }

export default function DefaultLayout() {
  const history = useHistory()
  const [menu, setMenu] = React.useState<ICustomMenu>(customMenu)
  const [menuToggle, setMenuToggle] = React.useState(false)

  const handleMenuToggleClick = React.useCallback(() => {
    setMenuToggle(!menuToggle)
  }, [menuToggle])

  React.useEffect(() => {
    const cacheUserName = localStorage.getItem('username')
    const cacheToken = localStorage.getItem('token')
    // if (!cacheUserName || !cacheToken) {
    //   history.push('/login')
    //   return
    // } else {
    let auth
    let filterMenu = customMenu
    try {
      auth = JSON.parse(localStorage.getItem('auth') || '')
    } catch (error) {}
    if (!auth) {
      filterMenu = customMenu.filter(item => !item.auth)
    }

    setMenu(filterMenu)
    // }
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
                path={item.path}
                exact={item.exact}
                render={() => {
                  const Wrapper = item.component
                  return (
                    <Suspense fallback={<div>loading</div>}>
                      <Wrapper />
                    </Suspense>
                  )
                }}
              />
            ))}
            <Redirect to="/404" />
          </Switch>
        </Content>
        {/* <AppFooter /> */}
      </Layout>
    </Layout>
  )
}
