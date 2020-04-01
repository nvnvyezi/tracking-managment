import React from 'react'
import dayjs from 'dayjs'
import {
  Form,
  Card,
  Table,
  Input,
  Button,
  DatePicker,
  message,
  Timeline,
} from 'antd'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'

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

  const columns: ColumnProps<IEventRes>[] = [
    {
      width: 140,
      title: '事件',
      key: 'event',
      fixed: 'left',
      dataIndex: 'event',
    },
    {
      width: 140,
      title: '设备Id',
      key: 'deviceId',
      dataIndex: 'deviceId',
    },
    {
      width: 300,
      key: 'params',
      title: 'Params',
      dataIndex: 'params',
      render: value => {
        const parseValue = JSON.parse(value)
        const keys = Object.keys(parseValue)
        return keys.map((key, index) => (
          <div key={key}>
            <h5>参数{index + 1}：</h5>
            <p>
              <span className="name">{key}</span>
              <span className="type">{parseValue[key]}</span>
            </p>
            <style jsx>{`
              .name,
              .type {
                display: inline-block;
                min-width: 100px;
                margin-right: 20px;
              }
              .type {
                min-width: 50px;
              }
            `}</style>
          </div>
        ))
      },
    },
    {
      key: 'url',
      width: 250,
      title: '页面url',
      dataIndex: 'url',
    },
    {
      title: '设备',
      width: 100,
      key: 'system',
      dataIndex: 'system',
    },
    {
      key: 'ip',
      width: 180,
      dataIndex: 'ip',
      title: '客户端ip地址',
    },
    {
      width: 100,
      title: '国家',
      key: 'country',
      dataIndex: 'country',
    },
    {
      width: 100,
      title: '省份',
      key: 'province',
      dataIndex: 'province',
    },
    {
      width: 100,
      key: 'city',
      title: '城市',
      dataIndex: 'city',
    },
    {
      width: 260,
      key: 'useragent',
      title: '浏览器信息',
      dataIndex: 'useragent',
    },
    {
      width: 240,
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const onFinish = values => {
    setFieldsValue(values)
  }

  const handleReset = () => {
    form.resetFields()
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
            <Button
              type="primary"
              onClick={handleReset}
              loading={buttonLoading}
              style={{ marginLeft: 20 }}
            >
              {!buttonLoading && <RedoOutlined />}
              重置
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
                <Table
                  bordered
                  rowKey="event"
                  columns={columns}
                  pagination={false}
                  dataSource={[item]}
                  scroll={{ x: 1630, y: 800 }}
                />
              </Timeline.Item>
            ))}
          </Timeline>
        }
      </Card>
    </Content>
  )
}
