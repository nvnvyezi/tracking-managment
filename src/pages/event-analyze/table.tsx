import React from 'react'
import dayjs from 'dayjs'
import { Card, Table } from 'antd'
import { ColumnProps } from 'antd/es/table'
import { TablePaginationConfig } from 'antd/lib/table'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

interface IEventRes {
  ip: string
  url: string
  city: string
  event: string
  params: string
  system: string
  country: string
  province: string
  useragent: string
}

export interface IFieldsValue {
  demand?: string
  event?: string
  date?: string[]
}

interface IEventAnalyzeTableProps {
  fieldsValue: IFieldsValue
}

export default function EventAnalyzeTable({
  fieldsValue,
}: IEventAnalyzeTableProps) {
  const [dataSource, setDataSource] = React.useState<IEventRes[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: total => `共${total}条数据`,
  })

  const handleTableChange = React.useCallback(
    paginationNext => {
      const { demand, event, date } = fieldsValue
      const { current, pageSize } = paginationNext
      const skip = (current - 1) * pageSize

      axios
        .get(API.event, {
          params: {
            skip,
            event,
            demand,
            startTime: dayjs(date?.[0]).format('YYYY-MM-DD'),
            endTime: dayjs(date?.[1]).format('YYYY-MM-DD'),
            limit: pageSize,
          },
        })
        .then(res => {
          setDataSource(res?.data?.list)
          setPagination(pre => ({ ...pre, current, total: res?.data?.total }))
        })
    },
    [fieldsValue],
  )

  const columns: ColumnProps<IEventRes>[] = [
    {
      width: 160,
      title: '事件',
      key: 'event',
      fixed: 'left',
      dataIndex: 'event',
    },
    {
      width: 300,
      key: 'params',
      title: 'Params',
      dataIndex: 'params',
      render: value => {
        const parseValue = JSON.parse(value)
        const keys = Object.keys(parseValue)
        return keys.map((key, index) => (
          <div key={key}>
            <h5>参数{index + 1}：</h5>
            <p>
              <span className="name">{key}</span>
              <span className="type">{parseValue[key]}</span>
            </p>
            <style jsx>{`
              .name,
              .type {
                display: inline-block;
                min-width: 100px;
                margin-right: 20px;
              }
              .type {
                min-width: 50px;
              }
            `}</style>
          </div>
        ))
      },
    },
    {
      key: 'url',
      width: 250,
      title: '页面url',
      dataIndex: 'url',
    },
    {
      title: '设备',
      width: 100,
      key: 'system',
      dataIndex: 'system',
    },
    {
      key: 'ip',
      width: 180,
      dataIndex: 'ip',
      title: '客户端ip地址',
    },
    {
      width: 100,
      title: '国家',
      key: 'country',
      dataIndex: 'country',
    },
    {
      width: 100,
      title: '省份',
      key: 'province',
      dataIndex: 'province',
    },
    {
      width: 100,
      key: 'city',
      title: '城市',
      dataIndex: 'city',
    },
    {
      width: 260,
      key: 'useragent',
      title: '浏览器信息',
      dataIndex: 'useragent',
    },
    {
      width: 240,
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  React.useEffect(() => {
    handleTableChange({ current: 1, pageSize: 10 })
  }, [handleTableChange])

  return (
    <Card title="表格数据" style={{ marginTop: 20 }}>
      <Table
        bordered
        rowKey="event"
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: 1630, y: 800 }}
      />
    </Card>
  )
}
