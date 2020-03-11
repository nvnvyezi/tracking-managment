import React from 'react'
import { Form, Input, Button, Radio } from 'antd'

import Content from '@/layout/content'

const { TextArea } = Input

export default function CreateTrack() {
  return (
    <Content crumbData={[{ value: '新增埋点' }]}>
      <div className="card-style wrapper-create">
        <h4>埋点相关信息</h4>
        <Form
          labelCol={{ span: 6 }}
          initialValues={{ system: 'ios', type: 'normal' }}
        >
          <Form.Item
            required
            label="事件名称"
            name="event"
            rules={[
              {
                max: 40,
                pattern: /^\w{1,40}$/,
                message: '仅支持字母，数字，下划线且长度不大于40',
              },
            ]}
          >
            <Input allowClear placeholder="请输入事件名称" />
          </Form.Item>
          <Form.Item
            required
            label="事件描述"
            name="describe"
            rules={[{ max: 100 }]}
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
            required
            label="版本"
            name="version"
            rules={[
              {
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
          <Form.Item required label="需求" name="demand" rules={[{ max: 30 }]}>
            <Input allowClear placeholder="请输入埋点所属需求" />
          </Form.Item>
          <Form.Item
            required
            label="PM负责人"
            name="principalPM"
            rules={[{ max: 20 }]}
          >
            <Input allowClear placeholder="请输入PM负责人" />
          </Form.Item>
          <Form.Item required label="参数" name="params">
            {/* <Form.List> */}
            <Input />
            {/* </Form.List> */}
          </Form.Item>
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
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      <style jsx>{`
        h4 {
          margin-bottom: 60px;
        }
        .wrapper-create :global(input) {
          width: 400px;
        }
        .wrapper-create :global(textarea) {
          width: 430px;
        }
      `}</style>
    </Content>
  )
}
