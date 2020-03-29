import React, { Suspense } from 'react'
// import { lazy } from '@loadable/component'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
// import loadable from './utils/loadable'
// import 'animate.css'
// import './style/base.scss'
// import './style/App.scss'

// import Login from './pages/login'
// import Home from './layout'

import Login from '@/pages/login'
import Register from '@/pages/register'
import { Loading } from '@/components/loading'

import Home from './layout'

// const Home = lazy(() => import(/* webpackChunkName: 'default' */ './layout'))

// // 基础页面
// const View404 = lazy(() =>
//   import(/* webpackChunkName: '404' */ './views/Others/404'),
// )
// const View500 = lazy(() =>
//   import(/* webpackChunkName: '500' */ './views/Others/500'),
// )
// const Login = lazy(() =>
//   import(/* webpackChunkName: 'login' */ './pages/login'),
// )

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route
          exact
          path="/management"
          render={() => <Redirect to="/management/welcome" />}
        />
        {/* <Route path="/500" component={View500} /> */}
        <Route
          exact
          path="/login"
          render={() => (
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          )}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          )}
        />
        <Route
          path="/management"
          render={() => (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          )}
        />
        {/* <Route path="/404" component={View404} /> */}
        <Route exact path="/404" render={() => <div>4044</div>} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  )
}
