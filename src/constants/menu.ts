import { ICustomMenu } from '@/interface/global'

const menu: ICustomMenu = [
  {
    key: '/home/welcome',
    title: '欢迎',
    icon: 'home',
  },
  {
    title: '埋点管理',
    key: '/control',
    icon: 'control',
    subs: [
      { title: '新增埋点', key: '/home/track/create', icon: '' },
      { title: '属性管理', key: '/home/track/attributes', icon: '' },
    ],
  },
  {
    title: '通用',
    key: '/public',
    icon: 'appstore',
    auth: true,
    subs: [
      { title: '按钮', key: '/public/button', icon: '' },
      { title: '图标', key: '/public/icon', icon: '' },
    ],
  },
  {
    title: '导航',
    key: '/nav',
    icon: 'bulb',
    subs: [
      { title: '下拉菜单', key: '/nav/dropdown', icon: '' },
      { title: '导航菜单', key: '/nav/menu', icon: '' },
      { title: '步骤条', key: '/nav/steps', icon: '' },
    ],
  },
  {
    title: '表单',
    key: '/form',
    icon: 'form',
    subs: [
      { title: '基础表单', key: '/form/base-form', icon: '' },
      { title: '步骤表单', key: '/form/step-form', icon: '' },
    ],
  },
  {
    title: '展示',
    key: '/show',
    icon: 'pie-chart',
    subs: [
      { title: '表格', key: '/show/table', icon: '' },
      { title: '折叠面板', key: '/show/collapse', icon: '' },
      { title: '树形控件', key: '/show/tree', icon: '' },
      { title: '标签页', key: '/show/tabs', icon: '' },
    ],
  },
  {
    title: '其它',
    key: '/others',
    icon: 'paper-clip',
    auth: true,
    subs: [
      { title: '进度条', key: '/others/progress', icon: '' },
      { title: '动画', key: '/others/animation', icon: '' },
      { title: '上传', key: '/others/upload', icon: '' },
      { title: '富文本', key: '/others/editor', icon: '' },
      { title: '404', key: '/404', icon: '' },
      { title: '500', key: '/500', icon: '' },
    ],
  },
  {
    title: '多级导航',
    key: '/one',
    icon: 'bars',
    subs: [
      {
        title: '二级',
        key: '/one/two',
        icon: '',
        subs: [{ title: '三级', key: '/one/two/three', icon: '' }],
      },
    ],
  },
  {
    title: '关于',
    key: '/about',
    icon: 'user',
  },
]

export default menu
