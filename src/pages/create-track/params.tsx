import React from 'react'

import { Form, Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

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
  const test = (...args) => {
    console.log(args)
  }

  return (
    <Form.Item required label={`参数${index}`} getValueFromEvent={test}>
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
