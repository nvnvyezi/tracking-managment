import React from 'react'
import { Form, Input, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import Content from '@/layout/content'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}

export default function createTrack() {
  const handleFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '新增埋点' },
      ]}
    >
      <div>
        <h4>事件选择</h4>
        <Form
          name="event_analyze"
          onFinish={handleFinish}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
          }}
        >
          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayout
                        : formItemLayoutWithOutLabel)}
                      label={index === 0 ? 'Passengers' : ''}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input passenger's name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="passenger name"
                          style={{ width: '60%', marginRight: 8 }}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => {
                            remove(field.name)
                          }}
                        />
                      )}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add()
                      }}
                      style={{ width: '60%' }}
                    >
                      <PlusOutlined />
                      Add field
                    </Button>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  )
}
