import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Radio, message } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import * as API from '@/constants/api'
import axios from '@/utils/axios'

import Content from '@/layout/content'

const { TextArea } = Input

export default function CreateTrack() {
  const history = useHistory()
  const [form] = Form.useForm()

  const [isUpdate, setIsUpdate] = React.useState(false)

  const onFinash = values => {
    if (isUpdate) {
      axios.patch(API.tracking, values).then(() => {
        message.success('属性更新成功')
        history.push('show')
      })
      return
    }
    axios.post(API.tracking, values).then(() => {
      message.success('埋点创建成功')
      history.push('show')
    })
  }

  React.useEffect(() => {
    const demand = history.location.search.match(/\?demand=(.*)/)?.[1]
    if (demand) {
      setIsUpdate(true)
      axios
        .get(API.tracking, { params: { demand: decodeURIComponent(demand) } })
        .then(res => {
          const {
            type,
            event,
            params,
            demand,
            system,
            version,
            describe,
            principalQA,
            principalRD,
            principalPM,
            principalFE,
            principalIos,
            principalAndroid,
          } = res.data?.list?.[0] || {}

          form.setFieldsValue({
            type,
            event,
            params,
            demand,
            system,
            version,
            describe,
            principalQA,
            principalRD,
            principalPM,
            principalFE,
            principalIos,
            principalAndroid,
          })
        })
    }
  }, [form, history.location.search])

  return (
    <Content crumbData={[{ value: '新增埋点' }]}>
      <div className="card-style wrapper-create">
        <h4>埋点相关信息</h4>
        <Form
          form={form}
          onFinish={onFinash}
          labelCol={{ span: 6 }}
          initialValues={{ system: 'ios', type: 'normal' }}
        >
          <Form.Item
            label="事件名称"
            name="event"
            rules={[
              {
                max: 40,
                required: true,
                whitespace: true,
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
            rules={[
              {
                max: 100,
                required: true,
                whitespace: true,
                message: '事件描述格式有误',
              },
            ]}
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
                whitespace: true,
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
            name="demand"
            label="需求名称"
            rules={[
              {
                max: 30,
                required: true,
                whitespace: true,
                message: '长度不大于30',
              },
            ]}
          >
            <Input
              allowClear
              disabled={isUpdate}
              placeholder="请输入埋点所属需求"
            />
          </Form.Item>
          <Form.Item
            label="PM负责人"
            name="principalPM"
            rules={[
              {
                max: 20,
                required: true,
                whitespace: true,
                message: '输入格式有误',
              },
            ]}
          >
            <Input allowClear placeholder="请输入PM负责人" />
          </Form.Item>
          <Form.List name="params">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  // <ComponentParams
                  //   add={add}
                  //   move={move}
                  //   field={field}
                  //   key={field.key}
                  //   remove={remove}
                  //   index={index + 2}
                  // />
                  <Form.Item
                    required
                    key={field.key}
                    label={`参数${index + 1}`}
                  >
                    <Form.Item
                      {...field}
                      rules={[{ required: true, whitespace: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <DeleteOutlined
                      onClick={() => {
                        remove(field.name)
                      }}
                      style={{ marginLeft: 10 }}
                    />
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
        .wrapper-create :global(.ant-form-item-control-input) {
          width: 400px;
        }
      `}</style>
    </Content>
  )
}
