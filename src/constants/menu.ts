import { ICustomMenu } from '@/interface/global'
import { HomeOutlined } from '@ant-design/icons'

const menu: ICustomMenu = [
  {
    key: '/home/welcome',
    title: '欢迎',
    Icon: HomeOutlined,
  },
  {
    title: '埋点管理',
    key: '/control',
    // Icon: 'control',
    Icon: HomeOutlined,
    subs: [
      { title: '埋点集合', key: '/home/track/create', Icon: '' },
      { title: '属性管理', key: '/home/track/attributes', Icon: '' },
    ],
  },
  {
    title: '事件分析',
    // Icon: 'appstore',
    Icon: HomeOutlined,
    key: '/home/event-analyze',
  },
  {
    title: '通用',
    key: '/public',
    Icon: HomeOutlined,
    // Icon: 'appstore',
    auth: true,
    subs: [
      { title: '按钮', key: '/public/button', Icon: '' },
      { title: '图标', key: '/public/icon', Icon: '' },
    ],
  },
  {
    title: '导航',
    key: '/nav',
    Icon: HomeOutlined,
    // Icon: 'bulb',
    subs: [
      { title: '下拉菜单', key: '/nav/dropdown', Icon: '' },
      { title: '导航菜单', key: '/nav/menu', Icon: '' },
      { title: '步骤条', key: '/nav/steps', Icon: '' },
    ],
  },
  {
    title: '表单',
    key: '/form',
    Icon: HomeOutlined,
    // Icon: 'form',
    subs: [
      { title: '基础表单', key: '/form/base-form', Icon: '' },
      { title: '步骤表单', key: '/form/step-form', Icon: '' },
    ],
  },
  {
    title: '展示',
    key: '/show',
    Icon: HomeOutlined,
    // Icon: 'pie-chart',
    subs: [
      { title: '表格', key: '/show/table', Icon: '' },
      { title: '折叠面板', key: '/show/collapse', Icon: '' },
      { title: '树形控件', key: '/show/tree', Icon: '' },
      { title: '标签页', key: '/show/tabs', Icon: '' },
    ],
  },
  {
    title: '其它',
    key: '/others',
    Icon: HomeOutlined,
    // Icon: 'paper-clip',
    auth: true,
    subs: [
      { title: '进度条', key: '/others/progress', Icon: '' },
      { title: '动画', key: '/others/animation', Icon: '' },
      { title: '上传', key: '/others/upload', Icon: '' },
      { title: '富文本', key: '/others/editor', Icon: '' },
      { title: '404', key: '/404', Icon: '' },
      { title: '500', key: '/500', Icon: '' },
    ],
  },
  {
    title: '多级导航',
    key: '/one',
    Icon: HomeOutlined,
    // Icon: 'bars',
    subs: [
      {
        title: '二级',
        key: '/one/two',
        Icon: '',
        subs: [{ title: '三级', key: '/one/two/three', Icon: '' }],
      },
    ],
  },
  {
    title: '关于',
    key: '/about',
    Icon: HomeOutlined,
    // Icon: 'user',
  },
]

export default menu
