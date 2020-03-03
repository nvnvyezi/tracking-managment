import React from 'react'
import { Form, Select, Button, Row, Col } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import Content from '@/layout/content'

import Echarts from './echarts'
import EventAnalyzeTable from './table'

const { Option } = Select

export default function createTrack() {
  const handleFinish = (values: any) => {
    console.log('Received values of form:', values)
  }

  function renderFormContent() {
    return (
      <Form
        name="event_analyze"
        onFinish={handleFinish}
        wrapperCol={{
          xs: { span: 10, offset: 0 },
          sm: { span: 10, offset: 4 },
        }}
      >
        <Form.List name="names">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Form.Item
                    // {...(index === 0
                    //   ? formItemLayout
                    //   : formItemLayoutWithOutLabel)}
                    // {...formItemLayout}
                    label={index + 1}
                    required={false}
                    className="form-line"
                  >
                    <Col>
                      <Form.Item
                        name="event"
                        label={index}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: '请选泽事件!',
                          },
                        ]}
                      >
                        <Select placeholder="Please select a country">
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        name="options"
                        label={index}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: '请选择选项',
                          },
                        ]}
                      >
                        <Select placeholder="Please select a country">
                          <Option value="china">China</Option>
                          <Option value="usa">U.S.A</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* {fields.length > 1 && ( */}
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                    {/* )} */}
                  </Form.Item>
                </Row>
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
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
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
      <div className="wrapper-form">
        <h4>事件选择</h4>
        {renderFormContent()}
      </div>
      <Echarts />
      <EventAnalyzeTable />
      <style jsx>{`
        .wrapper-form {
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0px 2px 13px 0px rgba(228, 228, 228, 0.6);
          background-color: rgb(255, 255, 255);
        }
        .wrapper-form :glpbal(.form-line) {
          display: flex;
        }
      `}</style>
    </Content>
  )
}
