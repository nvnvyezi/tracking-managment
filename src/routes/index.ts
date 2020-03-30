// const Welcome = lazy(() =>
//   import(/* webpackChunkName: 'index' */ '@/pages/welcome'),
// )

import Welcome from '@/pages/welcome'
import UserAll from '@/pages/user-all'
import UserOwn from '@/pages/user-own'
import Tracking from '@/pages/tracking'
import Attributes from '@/pages/attributes'
import CreateTrack from '@/pages/create-track'
import EventAnalyze from '@/pages/event-analyze'
import CreateAttributes from '@/pages/create-attributes'

const routes = [
  {
    name: '欢迎',
    exact: true,
    auth: false,
    path: '/welcome',
    component: Welcome,
  },
  {
    exact: true,
    auth: false,
    name: '埋点列表',
    path: '/track/show',
    component: Tracking,
  },
  {
    exact: true,
    auth: false,
    name: '新增埋点',
    path: '/track/create',
    component: CreateTrack,
  },
  {
    exact: true,
    auth: false,
    name: '属性列表',
    component: Attributes,
    path: '/attribute/show',
  },
  {
    exact: true,
    auth: false,
    name: '新增属性',
    path: '/attribute/create',
    component: CreateAttributes,
  },
  {
    exact: true,
    auth: false,
    name: '事件分析',
    path: '/event-analyze',
    component: EventAnalyze,
  },
  {
    exact: true,
    auth: false,
    name: '个人信息',
    path: '/user/own',
    component: UserOwn,
  },
  {
    exact: true,
    auth: false,
    name: '所有用户',
    path: '/user/all',
    component: UserAll,
  },
]

export default routes
