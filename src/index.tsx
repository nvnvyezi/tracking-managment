import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

import Router from './Router'

import '@/style/base.less'

const AppView = (
  <Provider store={store}>
    <Router />
  </Provider>
)

ReactDOM.render(AppView, document.getElementById('app'))
