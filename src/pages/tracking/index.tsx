import React from 'react'
import { ColumnProps } from 'antd/es/table'
import { Table, Button, Select, Form, Row, Col, Dropdown, Menu } from 'antd'
import { SearchOutlined, RedoOutlined, DownOutlined } from '@ant-design/icons'

import Content from '@/layout/content'

import { formData } from '@/constants/tracking'

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
      title: '事件名',
      dataIndex: 'eventName',
      key: 'eventName',
    },
    {
      title: '事件描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Params',
      dataIndex: 'params',
      key: 'params',
    },
    {
      title: '基本信息',
      dataIndex: 'basicInfo',
      key: 'basicInfo',
    },
    {
      title: '负责人',
      dataIndex: 'duty',
      key: 'duty',
    },
    {
      title: '添加时间',
      dataIndex: 'createtime',
      key: 'createtime',
    },
    {
      title: '创建人',
      dataIndex: 'createby',
      key: 'createby',
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

  function handleMenuClick(e) {
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
    <Content crumbData={[{ label: '', value: '埋点管理' }]}>
      {renderForm()}
      <Table
        bordered
        rowKey="id"
        dataSource={data}
        columns={columns}
        rowSelection={rowSelection}
      />
    </Content>
  )
}
