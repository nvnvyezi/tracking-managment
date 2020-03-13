import React from 'react'
import { Form, Input, Button, Radio, Select } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import Content from '@/layout/content'

const { Option } = Select
const { TextArea } = Input

export default function CreateTrack() {
  const onFinash = values => {
    console.log(values)
  }

  return (
    <Content crumbData={[{ value: '新增埋点' }]}>
      <div className="card-style wrapper-create">
        <h4>埋点相关信息</h4>
        <Form
          labelCol={{ span: 6 }}
          onFinish={onFinash}
          initialValues={{ system: 'ios', type: 'normal' }}
        >
          <Form.Item
            label="事件名称"
            name="event"
            rules={[
              {
                max: 40,
                required: true,
                pattern: /^\w{1,40}$/,
                message: '仅支持字母，数字，下划线且长度不大于40',
              },
            ]}
          >
            <Input allowClear placeholder="请输入事件名称" />
          </Form.Item>
          <Form.Item
            label="事件描述"
            name="describe"
            rules={[{ max: 100, required: true, message: '事件描述格式有误' }]}
          >
            <TextArea
              allowClear
              className="textarea"
              autoSize={{ minRows: 4 }}
              placeholder="请输入事件描述"
            />
          </Form.Item>
          <Form.Item required label="操作系统" name="system">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="ios">ios</Radio.Button>
              <Radio.Button value="web">web</Radio.Button>
              <Radio.Button value="server">server</Radio.Button>
              <Radio.Button value="android">android</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item required label="类型" name="type">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="normal">常规埋点</Radio.Button>
              <Radio.Button value="kernel">核心埋点</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="版本"
            name="version"
            rules={[
              {
                required: true,
                pattern: /^(\d{1,2}\.){2}\d{1,2}$/,
                message: '版本号格式为 xx.xx.xx',
              },
            ]}
          >
            <Input
              allowClear
              placeholder="请输入版本号"
              style={{ width: 200 }}
            />
          </Form.Item>
          <Form.Item
            label="需求"
            name="demand"
            rules={[{ max: 30, required: true, message: '长度不大于30' }]}
          >
            <Input allowClear placeholder="请输入埋点所属需求" />
          </Form.Item>
          <Form.Item
            label="PM负责人"
            name="principalPM"
            rules={[{ max: 20, required: true, message: '输入格式有误' }]}
          >
            <Input allowClear placeholder="请输入PM负责人" />
          </Form.Item>
          <Form.List name="params">
            {(fields, { add, remove, move }) => (
              <>
                {/* <ComponentParams showClear={false} /> */}
                {fields.map((field, index) => (
                  // <ComponentParams
                  //   add={add}
                  //   move={move}
                  //   field={field}
                  //   key={field.key}
                  //   remove={remove}
                  //   index={index + 2}
                  // />
                  <Form.Item key={field.key}>
                    <Form.Item name="name">
                      <Input />
                    </Form.Item>
                    <Form.Item name="select">
                      <Select>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                      </Select>
                    </Form.Item>
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ offset: 6 }}>
                  <Button
                    type="dashed"
                    style={{ width: 400 }}
                    onClick={() => {
                      add()
                    }}
                  >
                    <PlusOutlined /> 新增参数
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item label="FE负责人" name="principalFE" rules={[{ max: 20 }]}>
            <Input allowClear placeholder="请输入FE负责人" />
          </Form.Item>
          <Form.Item label="RD负责人" name="principalRD" rules={[{ max: 20 }]}>
            <Input allowClear placeholder="请输入RD负责人" />
          </Form.Item>
          <Form.Item
            label="ios负责人"
            name="principalIos"
            rules={[{ max: 20 }]}
          >
            <Input allowClear placeholder="请输入ios负责人" />
          </Form.Item>
          <Form.Item
            label="Android负责人"
            rules={[{ max: 20 }]}
            name="principalAndroid"
          >
            <Input allowClear placeholder="请输入Android负责人" />
          </Form.Item>
          <Form.Item label="QA负责人" name="principalQA" rules={[{ max: 20 }]}>
            <Input allowClear placeholder="请输入QA负责人" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <style jsx>{`
        h4 {
          margin-bottom: 60px;
        }
        .wrapper-create :global(.ant-input-affix-wrapper) {
          width: 400px;
        }
        .wrapper-create :global(textarea) {
          width: 430px;
        }
      `}</style>
    </Content>
  )
}

interface IComponentParamsProps {
  index?: number
  showClear?: boolean
  field?: {
    name: number
    key: number
    fieldKey: number
  }
  add?: () => void
  remove?: (index: number) => void
  move?: (from: number, to: number) => void
}

function ComponentParams({
  add,
  move,
  field,
  remove,
  index = 1,
  showClear = true,
}: IComponentParamsProps) {
  const handleRemove = () => {
    if (field && remove) {
      remove(field?.name)
    }
  }
  return (
    <Form.Item required label={`参数${index}`} {...field}>
      <div className="wrapper">
        <div className="wrapper-select">
          <Form.Item name="name">
            <Select style={{ width: 180 }} placeholder="请选择参数名称">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type">
            <Select
              placeholder="请选择参数类型"
              style={{ width: 180, marginLeft: 20 }}
            >
              <Option value="1">3</Option>
              <Option value="2">4</Option>
            </Select>
          </Form.Item>
          {showClear && (
            <DeleteOutlined onClick={handleRemove} style={{ marginLeft: 10 }} />
          )}
        </div>
        <Form.Item
          name="describe"
          rules={[{ max: 50, message: '长度不大于50' }]}
        >
          <TextArea style={{ width: 380 }} placeholder="请输入参数名称" />
        </Form.Item>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 10px;
          border: 1px solid #f5f6f7;
          border-radius: 4px;
        }
        .wrapper-select {
          display: flex;
        }
      `}</style>
    </Form.Item>
  )
}
