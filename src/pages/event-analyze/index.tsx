import React from 'react'
import { Form, Card, Select, Button, DatePicker } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import * as API from '@/constants/api'
import axios from '@/utils/axios'

import Content from '@/layout/content'

import Echarts from './echarts'
import EventAnalyzeTable, { IFieldsValue } from './table'

const { Option } = Select
const { RangePicker } = DatePicker

export default function EventAnalyze() {
  const [form] = Form.useForm()
  const [events, setEvents] = React.useState([])
  const [demands, setDemands] = React.useState([])
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [fieldsValue, setFieldsValue] = React.useState<IFieldsValue>({})

  const onFinish = values => {
    setButtonLoading(true)
    setFieldsValue(values)
    setTimeout(() => {
      setButtonLoading(false)
    }, 1000)
  }

  React.useEffect(() => {
    axios.get(API.eventDemand).then(res => {
      setDemands(res.data)
      form.setFieldsValue({ demand: res.data?.[0] })
      setFieldsValue(prev => ({
        ...prev,
        demand: res.data?.[0],
      }))
    })
    axios.get(API.eventEvent).then(res => {
      setEvents(res.data)
      form.setFieldsValue({ event: res.data?.[0] })
      setFieldsValue(prev => ({
        ...prev,
        event: res.data?.[0],
      }))
    })
  }, [form])

  function renderFormContent() {
    return (
      <Card title="事件筛选项">
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item name="demand" label="需求名称">
            <Select style={{ width: 250 }} placeholder="请选择需求名称">
              {demands.map(item => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="event" label="事件名称">
            <Select style={{ width: 250 }} placeholder="请选择事件">
              {events.map(item => (
                <Option key={item} value={item}>
                  {item}
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
            <Button type="primary" htmlType="submit" loading={buttonLoading}>
              {!buttonLoading && <SearchOutlined />}
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
      <Echarts fieldsValue={fieldsValue} />
      <EventAnalyzeTable fieldsValue={fieldsValue} />
    </Content>
  )
}
