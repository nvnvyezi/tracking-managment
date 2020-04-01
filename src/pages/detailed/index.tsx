import React from 'react'
import dayjs from 'dayjs'
import {
  Form,
  Card,
  Input,
  Button,
  message,
  Timeline,
  DatePicker,
  Descriptions,
} from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

import Content from '@/layout/content'

const { RangePicker } = DatePicker

interface IEventRes {
  ip: string
  url: string
  city: string
  event: string
  params: string
  system: string
  country: string
  province: string
  deviceId: string
  useragent: string
  createTime: string
}

interface IFieldsValue {
  deviceId?: string
  date?: string[]
}

export default function Attributes() {
  const [form] = Form.useForm()

  const [list, setList] = React.useState<IEventRes[]>([])
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [fieldsValue, setFieldsValue] = React.useState<IFieldsValue>({})

  const onFinish = values => {
    setFieldsValue(values)
  }

  React.useEffect(() => {
    const { deviceId, date } = fieldsValue
    if (!deviceId) {
      message.warn('请输入deviceId')
      return
    }
    if (!date?.length) {
      message.warn('请选择时间')
      return
    }
    setButtonLoading(true)
    axios
      .get(API.event, {
        params: {
          deviceId,
          startTime: dayjs(date[0]).format('YYYY-MM-DD'),
          endTime: dayjs(date[1]).format('YYYY-MM-DD'),
        },
      })
      .then(res => {
        setList(res.data?.list)
      })
      .finally(() => {
        setButtonLoading(false)
      })
  }, [fieldsValue])

  function renderForm() {
    return (
      <Card title="筛选项" style={{ marginBottom: 20 }}>
        <Form
          layout="inline"
          name="tracking"
          onFinish={onFinish}
          form={form}
          initialValues={{ type: '' }}
        >
          <Form.Item name="deviceId" label="deviceId">
            <Input style={{ width: 260 }} placeholder="请输入deviceId" />
          </Form.Item>
          <Form.Item name="date" label="时间范围">
            <RangePicker
              style={{ width: 300 }}
              placeholder={['开始日期', '结束日期']}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={buttonLoading}
              style={{ marginLeft: 30 }}
            >
              {!buttonLoading && <SearchOutlined />}
              查询
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }

  return (
    <Content crumbData={[{ value: '日志细查' }]}>
      {renderForm()}
      <Card title="详细事件">
        {
          <Timeline mode="alternate">
            {list.map((item, index) => (
              <Timeline.Item
                key={index}
                color="green"
                label={dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
              >
                <Descriptions title={item.event} column={2}>
                  <Descriptions.Item label="deviceId">
                    {item.deviceId}
                  </Descriptions.Item>
                  <Descriptions.Item label="params">
                    {item.params}
                  </Descriptions.Item>
                  <Descriptions.Item label="url">{item.url}</Descriptions.Item>
                  <Descriptions.Item label="system">
                    {item.system}
                  </Descriptions.Item>
                  <Descriptions.Item label="ip">{item.ip}</Descriptions.Item>
                  <Descriptions.Item label="country">
                    {item.country}
                  </Descriptions.Item>
                  <Descriptions.Item label="province">
                    {item.province}
                  </Descriptions.Item>
                  <Descriptions.Item label="city">
                    {item.city}
                  </Descriptions.Item>
                  <Descriptions.Item label="useragent">
                    {item.useragent}
                  </Descriptions.Item>
                  <Descriptions.Item label="createTime">
                    {dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                  </Descriptions.Item>
                </Descriptions>
              </Timeline.Item>
            ))}
          </Timeline>
        }
      </Card>
    </Content>
  )
}
