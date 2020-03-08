import React from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import Content from '@/layout/content'

import Echarts from './echarts'
import EventAnalyzeTable from './table'

const { Option } = Select
const { RangePicker } = DatePicker

const initData: any[] = []
for (let i = 10; i < 36; i++) {
  initData.push({ label: i.toString(36) + i, value: i.toString(36) + i })
}

export default function createTrack() {
  const handleFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  function renderFormContent() {
    return (
      <Form name="event_analyze" layout="inline" onFinish={handleFinish}>
        <Form.Item name="events" style={{ width: 400, marginBottom: 20 }}>
          <Select
            mode="multiple"
            placeholder="请选择需要查询的事件"
            defaultValue={['a10', 'c12']}
          >
            {initData.map(item => (
              <Option key={item.label} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="second" style={{ width: 200 }}>
          <Select
            mode="multiple"
            placeholder="请选择需要查询的事件"
            defaultValue={['a10', 'c12']}
          >
            {initData.map(item => (
              <Option key={item.label} value={item.value}>
                {item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="third">
          <RangePicker
            style={{ width: 400 }}
            placeholder={['开始日期', '结束日期']}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <PlusOutlined />
            查询
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '事件分析' },
      ]}
    >
      <div className="card-style wrapper-form">
        <h4>事件选择</h4>
        {renderFormContent()}
      </div>
      <Echarts />
      <EventAnalyzeTable />
      <style jsx>{`
        .wrapper-form {
        }
      `}</style>
    </Content>
  )
}
