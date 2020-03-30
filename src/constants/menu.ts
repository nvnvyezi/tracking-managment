import { ICustomMenu } from '@/interface/global'
import {
  HomeOutlined,
  ClusterOutlined,
  LineChartOutlined,
  UserSwitchOutlined,
  DeploymentUnitOutlined,
} from '@ant-design/icons'

const menu: ICustomMenu = [
  {
    title: '欢迎',
    Icon: HomeOutlined,
    key: '/management/welcome',
  },
  {
    title: '埋点管理',
    key: '/management/track',
    Icon: DeploymentUnitOutlined,
    subs: [
      { title: '埋点列表', key: '/management/track/show' },
      { title: '新增埋点', key: '/management/track/create' },
    ],
  },
  {
    title: '属性管理',
    Icon: ClusterOutlined,
    key: '/management/attribute',
    subs: [
      { title: '属性列表', key: '/management/attribute/show' },
      { title: '新增属性', key: '/management/attribute/create' },
    ],
  },
  {
    title: '事件分析',
    Icon: LineChartOutlined,
    key: '/management/event-analyze',
  },
  {
    title: '用户管理',
    key: '/management/user',
    Icon: UserSwitchOutlined,
    subs: [
      { title: '个人信息', key: '/management/user/own' },
      { title: '所有信息', key: '/management/user/create' },
    ],
  },
]

export default menu
