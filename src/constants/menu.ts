import { ICustomMenu } from '@/interface/global'
import { HomeOutlined, ClusterOutlined } from '@ant-design/icons'

const menu: ICustomMenu = [
  {
    key: '/management/welcome',
    title: '欢迎',
    Icon: HomeOutlined,
  },
  {
    title: '埋点管理',
    key: '/management/track',
    // Icon: 'control',
    Icon: HomeOutlined,
    subs: [
      { title: '埋点列表', key: '/management/track/show' },
      { title: '新增埋点', key: '/management/track/create' },
    ],
  },
  {
    title: '属性管理',
    key: '/management/attributes',
    Icon: ClusterOutlined,
    subs: [
      { title: '属性列表', key: '/management/attribute/show' },
      { title: '新增属性', key: '/management/attribute/create' },
    ],
  },
  {
    title: '事件分析',
    // Icon: 'appstore',
    Icon: HomeOutlined,
    key: '/home/event-analyze',
  },
  {
    title: '关于',
    key: '/about',
    Icon: HomeOutlined,
    // Icon: 'user',
  },
]

export default menu
