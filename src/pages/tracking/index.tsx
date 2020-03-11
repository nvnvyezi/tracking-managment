import React from 'react'
import { Button, Select, Form, Row, Col, Dropdown, Menu } from 'antd'
import { SearchOutlined, RedoOutlined, DownOutlined } from '@ant-design/icons'

import { ClickParam } from 'antd/lib/menu'
import { ColumnProps } from 'antd/es/table'

import { formData } from '@/constants/tracking'

import Content from '@/layout/content'

import CustomTable from '@/components/custom-table'

import { pointSourceData } from '../../../mocks/creat-tracking'

interface IPoint {
  id: string
  duty: string
  params: string
  createby: string
  eventName: string
  basicInfo: string
  createtime: string
  description: string
}

const { Option } = Select

export default function CreatePoint() {
  const data: IPoint[] = pointSourceData
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([])

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  const handleEdit = (item: IPoint) => {
    // edit
    console.log(item)
  }

  const handleDelete = (item: IPoint) => {
    // delete
    console.log(item)
  }

  const handleOffline = (item: IPoint) => {
    // offline
    console.log(item)
  }

  const columns: ColumnProps<IPoint>[] = [
    {
      title: '操作系统',
      key: 'system',
      dataIndex: 'system',
    },
    {
      key: 'event',
      title: '事件名',
      dataIndex: 'event',
    },
    {
      key: 'describe',
      title: '事件描述',
      dataIndex: 'describe',
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      key: 'params',
      title: 'Params',
      dataIndex: 'params',
    },
    {
      title: '需求',
      key: 'demand',
      dataIndex: 'demand',
    },
    {
      key: 'demand',
      title: '操作版本',
      dataIndex: 'demand',
    },
    {
      title: 'PM负责人',
      key: 'principalPM',
      dataIndex: 'principalPM',
    },
    {
      title: '添加时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: item => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="link" onClick={() => handleEdit(item)}>
            编辑
          </Button>
          <Button type="link" onClick={() => handleOffline(item)}>
            下线
          </Button>
          <Button type="link" onClick={() => handleDelete(item)}>
            删除
          </Button>
        </div>
      ),
    },
  ]

  const onFinish = (values: { [name: string]: any }) => {
    console.log(values)
  }

  function handleMenuClick(e: ClickParam) {
    console.log('click', e)
  }

  function renderForm() {
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">拒绝</Menu.Item>
        <Menu.Item key="2">开发完成</Menu.Item>
        <Menu.Item key="3">上线</Menu.Item>
        <Menu.Item key="4">下线</Menu.Item>
      </Menu>
    )
    return (
      <div className="card-style">
        <Form name="tracking" onFinish={onFinish}>
          <Row gutter={24}>
            {formData.map(form => (
              <Col key={form.key} span={8}>
                <Form.Item
                  name={form.key}
                  label={form.label}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17, offset: 1 }}
                >
                  <Select defaultValue={form.defaultValue}>
                    {form.data.map(item => (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  查询
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: 10 }}
                  // onClick={() => {
                  //   form.resetFields();
                  // }}
                >
                  <RedoOutlined />
                  重置
                </Button>
                <Dropdown overlay={menu}>
                  <Button type="primary" style={{ marginLeft: 10 }}>
                    批量操作 <DownOutlined />
                  </Button>
                </Dropdown>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <style jsx>{`
          div {
            margin-bottom: 20px;
            padding-bottom: 0;
          }
        `}</style>
      </div>
    )
  }

  return (
    <Content crumbData={[{ value: '埋点管理' }]}>
      {renderForm()}
      <CustomTable
        rowKey="id"
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
      />
    </Content>
  )
}
