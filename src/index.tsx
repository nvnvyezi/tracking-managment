import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

import Router from './Router'

import '@/style/antd.less'
import '@/style/base.less'
import '@/style/utils.less'

const AppView = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(AppView, document.getElementById('app'))
