const formData = [
  {
    key: 'system',
    label: '操作系统',
    defaultValue: 0,
    data: [
      {
        value: 0,
        label: '全部',
      },
      {
        value: 1,
        label: 'android',
      },
      {
        value: 2,
        label: 'ios',
      },
      {
        value: 3,
        label: 'web',
      },
      {
        value: 4,
        label: 'server',
      },
    ],
  },
  {
    key: 'type',
    label: '埋点类型',
    defaultValue: 0,
    data: [
      {
        value: 0,
        label: '全部',
      },
      {
        value: 1,
        label: '常规埋点',
      },
      {
        value: 2,
        label: '核心埋点',
      },
    ],
  },
  {
    key: 'status',
    label: '埋点状态',
    defaultValue: 0,
    data: [
      {
        value: 0,
        label: '全部',
      },
      {
        value: 1,
        label: '待开发',
      },
      {
        value: 2,
        label: '修改后待开发',
      },
      {
        value: 3,
        label: '开发完成',
      },
      {
        value: 4,
        label: '已上线',
      },
      {
        value: 5,
        label: '已下线',
      },
      {
        value: 6,
        label: '被拒绝',
      },
    ],
  },
]

export { formData }
