import React, { ReactNode } from 'react'

import Content from '@/layout/content'
import { Table, Input, Button, Select, Radio } from 'antd'
import { ColumnProps } from 'antd/es/table'

import { pointSourceData, pointFilterItems } from '../../../mocks/data'

const { Search } = Input

interface IPoint {
  id: string
  eventName: string
  description: string
  params: string
  basicInfo: string
  duty: string
  createtime: string
  createby: string
}

interface IFilterItem {
  label: string
  defaultValue: string
}

export default function createPoint() {
  const data: IPoint[] = pointSourceData

  const handleEdit = (item: IPoint) => {
    // edit
    console.log(item)
  }

  const handleDelete = (item: IPoint) => {
    // delete
    console.log(item)
  }

  const handleCopy = (item: IPoint) => {
    // copy
    console.log(item)
  }

  const handleOffline = (item: IPoint) => {
    // offline
    console.log(item)
  }

  const handleSample = (item: IPoint) => {
    // sample
    console.log(item)
  }

  const columns: ColumnProps<IPoint>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 120,
    },
    {
      title: '事件名',
      dataIndex: 'eventName',
      key: 'eventName',
      align: 'center',
      width: 100,
    },
    {
      title: '事件描述',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: 120,
    },
    {
      title: 'Params',
      dataIndex: 'params',
      key: 'params',
      align: 'center',
      width: 100,
    },
    {
      title: '基本信息',
      dataIndex: 'basicInfo',
      key: 'basicInfo',
      align: 'center',
      width: 100,
    },
    {
      title: '负责人',
      dataIndex: 'duty',
      key: 'duty',
      align: 'center',
      width: 100,
    },
    {
      title: '添加时间',
      dataIndex: 'createtime',
      key: 'createtime',
      align: 'center',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'createby',
      key: 'createby',
      align: 'center',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      width: 220, // eslint-disable-next-line react/display-name
      render: (item: IPoint) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="link" onClick={() => handleEdit(item)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleCopy(item)}>
            复制
          </Button>
          <Button type="link" onClick={() => handleOffline(item)}>
            下线
          </Button>
          <Button type="link" onClick={() => handleDelete(item)}>
            删除
          </Button>
          <Button type="link" onClick={() => handleSample(item)}>
            示例
          </Button>
        </div>
      ),
    },
  ]

  const filterItems: IFilterItem[] = pointFilterItems
  const FilterItem = (label: string, defaultValue: string) => {
    return (
      <div style={{ width: '20%', display: 'inline-block', marginBottom: 20 }}>
        {`${label}：`}
        <Select defaultValue={defaultValue} style={{ width: 95 }}></Select>
      </div>
    )
  }

  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '新增埋点' },
      ]}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 6,
            fontSize: '14',
          }}
        >
          {filterItems.map(item => FilterItem(item.label, item.defaultValue))}
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'inline-block' }}>
            <Button type="primary">新增埋点</Button>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Button type="primary">批量新增</Button>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Button type="primary">新增埋点</Button>
          </div>
          <div style={{ display: 'inline-block' }}>
            <Button type="primary">批量新增</Button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <span>是否展开：</span>
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>表格</Radio>
            <Radio value={2}>展开</Radio>
          </Radio.Group>
        </div>
        <div
          style={{
            width: '50%',
            display: 'inline-flex',
            flexDirection: 'row-reverse',
            marginBottom: 20,
          }}
        >
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => {
              // Todo
            }}
          >
            更多批量操作
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            disabled
            onClick={() => {
              // Todo
            }}
          >
            批量上线
          </Button>
          <Button
            type="primary"
            disabled
            style={{ marginLeft: 10 }}
            onClick={() => {
              // Todo
            }}
          >
            批量开发完成
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
        }}
      ></div>
      <Table rowKey="id" dataSource={data} columns={columns} bordered />
    </Content>
  )
}
