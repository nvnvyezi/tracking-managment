import React, { Suspense } from 'react'
import { lazy } from '@loadable/component'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
// import loadable from './utils/loadable'
// import 'animate.css'
// import './style/base.scss'
// import './style/App.scss'

// import Login from './pages/login'
// import Home from './layout'
import { Loading } from '@/components/loading'

const Home = lazy(() => import(/* webpackChunkName: 'default' */ './layout'))

// // 基础页面
// const View404 = lazy(() =>
//   import(/* webpackChunkName: '404' */ './views/Others/404'),
// )
// const View500 = lazy(() =>
//   import(/* webpackChunkName: '500' */ './views/Others/500'),
// )
const Login = lazy(() =>
  import(/* webpackChunkName: 'login' */ './pages/login'),
)

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
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
          path="/home"
          render={() => (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          )}
        />
        {/* <Route path="/404" component={View404} /> */}
        <Route
          path="*"
          render={() => {
            return <div>404</div>
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}
