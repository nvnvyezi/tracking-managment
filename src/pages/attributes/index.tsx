import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Input, Button, Form, Select, message } from 'antd'
import {
  RedoOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

import Content from '@/layout/content'
import CustomTable from '@/components/custom-table'

const { Option } = Select

import './index.scss'
interface IAttrData {
  name: string
  key: number
  min: string
  max: string
  value: string
  type: string
  meaning: string
  createtime: string
  createby: string
}

export default function Attributes() {
  const [form] = Form.useForm()

  const [dataSource, setDataSource] = React.useState([])

  const handleEdit = (item: IAttrData) => () => {
    // edit
    console.log(item)
  }

  const handleDelete = (item: IAttrData) => () => {
    axios
      .delete(API.attribute, { data: { name: item.name } })
      .then(() => {
        message.success('删除成功')
      })
      .catch(() => {
        message.error('非法操作')
      })
  }

  const columns: ColumnProps<IAttrData>[] = [
    {
      key: 'name',
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '含义',
      key: 'describe',
      dataIndex: 'describe',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (_, row) => (
        <>
          <EditOutlined onClick={handleEdit(row)} />
          <DeleteOutlined
            style={{ marginLeft: 20 }}
            onClick={handleDelete(row)}
          />
        </>
      ),
    },
  ]

  const onFinish = (values = {}) => {
    axios.get(API.attribute, { params: values }).then(res => {
      setDataSource(res.data?.data)
    })
  }

  const handleReset = () => {
    form.resetFields()
    onFinish()
  }

  React.useEffect(() => {
    axios.get(API.attribute).then(res => {
      setDataSource(res.data?.data)
    })
  }, [])

  function renderForm() {
    return (
      <div className="card-style">
        <Form
          layout="inline"
          name="tracking"
          onFinish={onFinish}
          form={form}
          initialValues={{ type: '' }}
        >
          <Form.Item name="creator" label="创建者">
            <Input
              style={{ width: 260 }}
              placeholder="请输入创建者名字，支持模糊搜索"
            />
          </Form.Item>
          <Form.Item name="name" label="属性名称">
            <Input
              style={{ width: 260 }}
              placeholder="请输入属性名称，支持模糊搜索"
            />
          </Form.Item>
          <Form.Item name="type" label="类型">
            <Select style={{ width: 140 }}>
              <Option value="">全部</Option>
              <Option value="string">string</Option>
              <Option value="number">number</Option>
              <Option value="boolean">boolean</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 50 }}>
              <SearchOutlined />
              查询
            </Button>
            <Button
              type="primary"
              onClick={handleReset}
              style={{ marginLeft: 10 }}
            >
              <RedoOutlined />
              重置
            </Button>
            <Link to="create">
              <Button
                type="primary"
                onClick={handleReset}
                style={{ marginLeft: 10 }}
              >
                <PlusOutlined />
                新增
              </Button>
            </Link>
          </Form.Item>
        </Form>
        <style jsx>{`
          div {
            margin-bottom: 20px;
            padding: 40px 30px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <Content crumbData={[{ value: '属性列表' }]}>
      {renderForm()}
      <CustomTable
        bordered
        rowKey="name"
        columns={columns}
        dataSource={dataSource}
      />
    </Content>
  )
}
