const statusMap = [
  {
    value: '',
    label: '全部',
  },
  {
    value: 0,
    label: '待开发',
  },
  {
    value: 1,
    label: '修改后待开发',
  },
  {
    value: 2,
    label: '开发完成',
  },
  {
    value: 3,
    label: '已上线',
  },
  {
    value: 4,
    label: '已下线',
  },
  {
    value: 5,
    label: '被拒绝',
  },
]

const typeMap = [
  {
    value: '',
    label: '全部',
  },
  {
    value: 'normal',
    label: '常规埋点',
  },
  {
    value: 'kernel',
    label: '核心埋点',
  },
]

const formData = [
  {
    key: 'system',
    label: '操作系统',
    defaultValue: '',
    data: [
      {
        value: '',
        label: '全部',
      },
      {
        value: 'android',
        label: 'android',
      },
      {
        value: 'ios',
        label: 'ios',
      },
      {
        value: 'web',
        label: 'web',
      },
      {
        value: 'server',
        label: 'server',
      },
    ],
  },
  {
    key: 'type',
    label: '埋点类型',
    defaultValue: '',
    data: typeMap,
  },
  {
    key: 'status',
    label: '埋点状态',
    defaultValue: '',
    data: statusMap,
  },
]

export { formData, statusMap, typeMap }
