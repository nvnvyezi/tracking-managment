import React from 'react'

import Content from '@/layout/content'
import { Table, Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'

import { attrSourceData } from '../../../mocks/attributes'

const { Search } = Input

import './index.scss'
interface IAttrData {
  param: string
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
  const data: IAttrData[] = attrSourceData

  const handleEdit = (item: IAttrData) => {
    // edit
    console.log(item)
  }

  const handleDelete = (item: IAttrData) => {
    // delete
    console.log(item)
  }

  const columns: ColumnProps<IAttrData>[] = [
    {
      title: 'Param',
      dataIndex: 'param',
      key: 'param',
      align: 'center',
      width: 120,
    },
    {
      title: '最小值',
      dataIndex: 'min',
      key: 'min',
      align: 'center',
      width: 100,
    },
    {
      title: '最大值',
      dataIndex: 'max',
      key: 'max',
      align: 'center',
      width: 100,
    },
    {
      title: 'value',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
    },
    {
      title: '含义',
      dataIndex: 'meaning',
      key: 'meaning',
      align: 'center',
    },
    {
      title: '添加时间',
      dataIndex: 'createtime',
      key: 'createtime',
      align: 'center',
      width: 120,
    },
    {
      title: '创建人',
      dataIndex: 'createby',
      key: 'createby',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      // eslint-disable-next-line react/display-name
      render: (item: IAttrData) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <EditOutlined onClick={() => handleEdit(item)} />
          <DeleteOutlined
            style={{ marginLeft: 20 }}
            onClick={() => handleDelete(item)}
          />
        </div>
      ),
    },
  ]

  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '属性管理' },
      ]}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: 20,
        }}
      >
        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() => {
            // Todo
          }}
        >
          批量添加
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={() => {
            // Todo
          }}
        >
          添加
        </Button>
        <Search
          style={{ width: 300 }}
          placeholder="Param/含义"
          enterButton
          onSearch={() => {
            // Todo
          }}
        ></Search>
      </div>
      <Table dataSource={data} columns={columns} bordered />
    </Content>
  )
}
