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
      { title: '埋点集合', key: '/home/track/show' },
      { title: '新增埋点', key: '/home/track/create' },
      { title: '属性管理', key: '/home/track/attributes' },
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
      { title: '按钮', key: '/public/button' },
      { title: '图标', key: '/public/icon' },
    ],
  },
  {
    title: '导航',
    key: '/nav',
    Icon: HomeOutlined,
    // Icon: 'bulb',
    subs: [
      { title: '下拉菜单', key: '/nav/dropdown' },
      { title: '导航菜单', key: '/nav/menu' },
      { title: '步骤条', key: '/nav/steps' },
    ],
  },
  {
    title: '表单',
    key: '/form',
    Icon: HomeOutlined,
    // Icon: 'form',
    subs: [
      { title: '基础表单', key: '/form/base-form' },
      { title: '步骤表单', key: '/form/step-form' },
    ],
  },
  {
    title: '展示',
    key: '/show',
    Icon: HomeOutlined,
    // Icon: 'pie-chart',
    subs: [
      { title: '表格', key: '/show/table' },
      { title: '折叠面板', key: '/show/collapse' },
      { title: '树形控件', key: '/show/tree' },
      { title: '标签页', key: '/show/tabs' },
    ],
  },
  {
    title: '其它',
    key: '/others',
    Icon: HomeOutlined,
    // Icon: 'paper-clip',
    auth: true,
    subs: [
      { title: '进度条', key: '/others/progress' },
      { title: '动画', key: '/others/animation' },
      { title: '上传', key: '/others/upload' },
      { title: '富文本', key: '/others/editor' },
      { title: '404', key: '/404' },
      { title: '500', key: '/500' },
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
        subs: [{ title: '三级', key: '/one/two/three' }],
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
