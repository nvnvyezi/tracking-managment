import React from 'react'
import { Form, Card, Select, Button, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import * as API from '@/constants/api'
import axios from '@/utils/axios'

import Content from '@/layout/content'

import Echarts from './echarts'
import EventAnalyzeTable from './table'

const { Option } = Select
const { RangePicker } = DatePicker

const initData: any[] = []
for (let i = 10; i < 36; i++) {
  initData.push({ label: i.toString(36) + i, value: i.toString(36) + i })
}

export default function EventAnalyze() {
  const [demands, setDemands] = React.useState([])

  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  React.useEffect(() => {
    axios.get(API.trackingDemand).then(res => {
      setDemands(res.data)
    })
  }, [])

  function renderFormContent() {
    return (
      <Card title="事件筛选项">
        <Form layout="inline" onFinish={onFinish}>
          <Form.Item name="demand" label="需求名称">
            <Select style={{ width: 200 }} placeholder="请选择需求名称">
              {demands.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="events" label="事件名称">
            <Select
              allowClear
              mode="multiple"
              style={{ width: 300 }}
              placeholder="请选择事件"
            >
              {initData.map(item => (
                <Option key={item.label} value={item.value}>
                  {item.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label="时间范围">
            <RangePicker
              style={{ width: 300 }}
              placeholder={['开始日期', '结束日期']}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined />
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  return (
    <Content crumbData={[{ value: '事件分析' }]}>
      {renderFormContent()}
      <Echarts />
      <EventAnalyzeTable />
    </Content>
  )
}
