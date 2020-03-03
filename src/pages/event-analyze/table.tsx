import React from 'react'

import CustomTable from '@/components/custom-table'

const columns = [
  {
    title: '事件',
    dataIndex: 'event',
    key: 'event',
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
]

const dataSource = [
  {
    event: '点击',
    sum: '30000',
    average: '4000',
  },
  {
    event: '展现',
    sum: '30000',
    average: '4000',
  },
  {
    event: '测试',
    sum: '30000',
    average: '4000',
  },
]

export default function EventAnalyzeTable() {
  return (
    <div className="wrapper-table">
      <CustomTable columns={columns} dataSource={dataSource} rowKey="event" />
      <style jsx>{`
        .wrapper-table {
          margin-top: 50px;
        }
      `}</style>
    </div>
  )
}
