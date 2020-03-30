import React from 'react'
import { Card } from 'antd'

import CustomTable from '@/components/custom-table'

const columns = [
  {
    title: '事件',
    dataIndex: 'event',
    key: 'event',
    fixed: 'left',
    width: 100,
  },
  {
    title: '总和',
    dataIndex: 'sum',
    key: 'sum',
  },
  {
    title: '均值',
    dataIndex: 'average',
    key: 'average',
  },
  {
    title: '页面url',
    dataIndex: 'url',
    key: 'url',
    width: 250,
  },
  {
    title: '设备',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: '客户端ip地址',
    dataIndex: 'ip',
    key: 'ip',
    width: 180,
  },
  {
    title: '国家',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province',
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: '浏览器信息',
    dataIndex: 'ua',
    key: 'ua',
    width: 260,
  },
  {
    title: '创建时间',
    dataIndex: 'date',
    key: 'date',
    fixed: 'right',
    width: 140,
  },
  {
    title: '操作',
    dataIndex: 'anction',
    key: 'anction',
    fixed: 'right',
    width: 100,
  },
]

const dataSource = [
  {
    event: '点击',
    sum: '30000',
    average: '4000',
    url: 'http://10.23.43.23/test',
    device: 'ios',
    ip: '10.220.34.32',
    country: '中国',
    province: '北京',
    city: '北京',
    ua:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    date: '2020/02/23',
  },
  {
    event: '展现',
    sum: '30000',
    average: '4000',
    url: 'http://10.23.43.23/test',
    device: 'ios',
    ip: '10.220.34.32',
    country: '中国',
    province: '北京',
    city: '北京',
    ua:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    date: '2020/02/23',
  },
  {
    event: '测试',
    sum: '30000',
    average: '4000',
    url: 'http://10.23.43.23/test',
    device: 'ios',
    ip: '10.220.34.32',
    country: '中国',
    province: '北京',
    city: '北京',
    ua:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    date: '2020/02/23',
  },
]

export default function EventAnalyzeTable() {
  return (
    <Card title="表格数据" style={{ marginTop: 20 }}>
      <CustomTable
        rowKey="event"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1500, y: 800 }}
      />
    </Card>
  )
}
