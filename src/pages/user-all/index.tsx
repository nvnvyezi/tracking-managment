import React from 'react'
import dayjs from 'dayjs'
import { Card, Table, message, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'
import { TablePaginationConfig } from 'antd/lib/table'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

import Content from '@/layout/content'

interface IUserRes {
  email: string
  admin: boolean
  username: string
  createTime: Date
}

export default function Attributes() {
  const [dataSource, setDataSource] = React.useState<IUserRes[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: total => `共${total}条数据`,
  })

  const handleTableChange = React.useCallback(paginationNext => {
    const { current, pageSize } = paginationNext
    const skip = (current - 1) * pageSize

    axios.get(API.user, { params: { skip, limit: pageSize } }).then(res => {
      setDataSource(res?.data?.list)
      setPagination(pre => ({ ...pre, current, total: res?.data?.total }))
    })
  }, [])

  const handleDelete = (item: IUserRes) => () => {
    axios
      .delete(API.user, { data: { username: item.username } })
      .then(() => {
        message.success('删除成功')
        const { total = 0, pageSize = 10, current } = pagination
        const endPage = Math.ceil(total / pageSize)
        if (current === endPage && total % pageSize === 1) {
          handleTableChange({ current: current - 1, pageSize })
        } else {
          handleTableChange(pagination)
        }
      })
      .catch(() => {
        message.error('非法操作')
      })
  }

  const handleUpdateAdmin = (item: IUserRes) => () => {
    axios
      .patch(API.userAdmin, { username: item.username, admin: true })
      .then(() => {
        message.success('设置成功')
        handleTableChange(pagination)
      })
      .catch(() => {
        message.error('非法操作')
      })
  }

  const columns: ColumnProps<IUserRes>[] = [
    {
      title: '用户名',
      key: 'username',
      dataIndex: 'username',
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
      render: value => value || '--',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'admin',
      title: '管理员',
      dataIndex: 'admin',
      render: value => (value ? '是' : '否'),
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (_, row) => {
        const admin = localStorage.getItem('admin')
        if (
          row.admin ||
          admin === 'false' ||
          row.username === localStorage.getItem('username')
        ) {
          return null
        }

        return (
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Popconfirm
              okText="确认"
              cancelText="取消"
              onConfirm={handleUpdateAdmin(row)}
              title={`确认将用户${row.username}设置为管理员吗?`}
            >
              <EditOutlined />
            </Popconfirm>
            <Popconfirm
              okText="确认"
              cancelText="取消"
              onConfirm={handleDelete(row)}
              title={`确认删除用户${row.username}吗?`}
            >
              <DeleteOutlined />
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  React.useEffect(() => {
    handleTableChange({ current: 1, pageSize: 10 })
  }, [handleTableChange])

  return (
    <Content crumbData={[{ value: '所有用户' }]}>
      <Card title="所有用户信息">
        <Table
          bordered
          rowKey="username"
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
    </Content>
  )
}
