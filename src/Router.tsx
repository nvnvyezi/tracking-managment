import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import loadable from './utils/loadable'
// import 'animate.css'
// import './style/base.scss'
// import './style/App.scss'

import Login from './pages/login'
import Home from './layout'

// 公共模块
// const DefaultLayout = loadable(() =>
//   import(/* webpackChunkName: 'default' */ './containers'),
// )

// // 基础页面
// const View404 = loadable(() =>
//   import(/* webpackChunkName: '404' */ './views/Others/404'),
// )
// const View500 = loadable(() =>
//   import(/* webpackChunkName: '500' */ './views/Others/500'),
// )
// const Login = loadable(() =>
//   import(/* webpackChunkName: 'login' */ './views/Login'),
// )

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact render={() => <Redirect to="/login" />} /> */}
        {/* <Route path="/500" component={View500} /> */}
        <Route exact path="/login" component={Login} />
        {/* <Route path="/404" component={View404} /> */}
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
