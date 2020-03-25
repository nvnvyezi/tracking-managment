import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import {
  Form,
  Table,
  Input,
  Modal,
  Radio,
  Button,
  Select,
  message,
  Popconfirm,
} from 'antd'
import {
  RedoOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { ColumnProps } from 'antd/es/table'
import { TablePaginationConfig } from 'antd/lib/table'

import * as API from '@/constants/api'

import axios from '@/utils/axios'

import Content from '@/layout/content'

const { Option } = Select
const { TextArea } = Input

interface IAttributeRes {
  createTime: Date
  creator: string
  describe: string
  name: string
  type: string
}

export default function Attributes() {
  const [form] = Form.useForm()
  const [modalForm] = Form.useForm()

  const [modalVisible, setModalVisible] = React.useState(false)
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [dataSource, setDataSource] = React.useState<IAttributeRes[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: total => `共${total}条数据`,
  })

  const handleTableChange = React.useCallback(
    paginationNext => {
      const { current, pageSize } = paginationNext
      const skip = (current - 1) * pageSize
      const values = form.getFieldsValue()
      setButtonLoading(true)

      axios
        .get(API.attribute, { params: { ...values, skip, limit: pageSize } })
        .then(res => {
          setDataSource(res?.data?.list)
          setPagination(pre => ({ ...pre, current, total: res?.data?.total }))
        })
        .finally(() => {
          setButtonLoading(false)
        })
    },
    [form],
  )

  const handleEdit = ({
    name,
    type,
    creator,
    describe,
  }: IAttributeRes) => () => {
    setModalVisible(true)
    setTimeout(() => {
      modalForm.setFieldsValue({ name, creator, type, describe })
    }, 100)
  }

  const handleModalOk = () => {
    modalForm.validateFields().then(({ name, describe, type, updater }) => {
      axios
        .patch(API.attribute, { name, describe, type, updater })
        .then(() => {
          message.success('属性更新成功')
          setModalVisible(false)
          handleTableChange(pagination)
        })
        .finally(() => {
          setConfirmLoading(false)
        })
    })
  }

  const handleModalCancel = () => {
    setModalVisible(false)
  }

  const handleDelete = (item: IAttributeRes) => () => {
    axios
      .delete(API.attribute, { data: { name: item.name } })
      .then(() => {
        message.success('删除成功')
        const { total = 0, pageSize = 10, current } = pagination
        const endPage = Math.ceil(total / pageSize)
        if (current === endPage && total % pageSize === 1) {
          handleTableChange({ current: current - 1, pageSize })
        } else {
          handleTableChange(pagination)
        }
      })
      .catch(() => {
        message.error('非法操作')
      })
  }

  const columns: ColumnProps<IAttributeRes>[] = [
    {
      key: 'name',
      title: 'name',
      dataIndex: 'name',
    },
    {
      key: 'type',
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '含义',
      key: 'describe',
      dataIndex: 'describe',
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      align: 'center',
      render: (_, row) => (
        <>
          <EditOutlined onClick={handleEdit(row)} />
          <Popconfirm
            okText="确认"
            cancelText="取消"
            onConfirm={handleDelete(row)}
            title={`确认删除${row.name}吗?`}
          >
            <DeleteOutlined style={{ marginLeft: 20 }} />
          </Popconfirm>
        </>
      ),
    },
  ]

  const onFinish = () => {
    handleTableChange({ current: 1, pageSize: 10 })
  }

  const handleReset = () => {
    form.resetFields()
    onFinish()
  }

  React.useEffect(() => {
    handleTableChange({ current: 1, pageSize: 10 })
  }, [handleTableChange])

  function renderForm() {
    return (
      <div className="card-style">
        <Form
          layout="inline"
          name="tracking"
          onFinish={onFinish}
          form={form}
          initialValues={{ type: '' }}
        >
          <Form.Item name="creator" label="创建者">
            <Input
              style={{ width: 260 }}
              placeholder="请输入创建者名字，支持模糊搜索"
            />
          </Form.Item>
          <Form.Item name="name" label="属性名称">
            <Input
              style={{ width: 260 }}
              placeholder="请输入属性名称，支持模糊搜索"
            />
          </Form.Item>
          <Form.Item name="type" label="类型">
            <Select style={{ width: 140 }}>
              <Option value="">全部</Option>
              <Option value="string">string</Option>
              <Option value="number">number</Option>
              <Option value="boolean">boolean</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Link to="create">
              <Button type="primary" style={{ marginLeft: 20 }}>
                <PlusOutlined />
                新建
              </Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              loading={buttonLoading}
              style={{ marginLeft: 30 }}
            >
              <SearchOutlined />
              查询
            </Button>
            <Button
              type="primary"
              onClick={handleReset}
              loading={buttonLoading}
              style={{ marginLeft: 20 }}
            >
              <RedoOutlined />
              重置
            </Button>
          </Form.Item>
        </Form>
        <style jsx>{`
          div {
            margin-bottom: 20px;
            padding: 40px 30px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <Content crumbData={[{ value: '属性列表' }]}>
      <Modal
        okText="确认"
        maskClosable
        destroyOnClose
        title="修改属性"
        cancelText="取消"
        onOk={handleModalOk}
        visible={modalVisible}
        onCancel={handleModalCancel}
        confirmLoading={confirmLoading}
      >
        <Form form={modalForm} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item required label="属性名称" name="name">
            <Input allowClear disabled />
          </Form.Item>
          <Form.Item
            label="属性描述"
            name="describe"
            rules={[{ max: 100, required: true, message: '属性描述格式有误' }]}
          >
            <TextArea
              allowClear
              className="textarea"
              autoSize={{ minRows: 4 }}
              placeholder="请输入事件描述"
            />
          </Form.Item>
          <Form.Item required label="属性类型" name="type">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="string">string</Radio.Button>
              <Radio.Button value="number">number</Radio.Button>
              <Radio.Button value="boolean">boolean</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item required label="创建者" name="creator">
            <Input allowClear disabled />
          </Form.Item>
          <Form.Item
            label="更新者"
            name="updater"
            rules={[{ max: 20, required: true, message: '输入格式有误' }]}
          >
            <Input allowClear placeholder="请输入更新人名称" />
          </Form.Item>
        </Form>
      </Modal>
      {renderForm()}
      <Table
        bordered
        rowKey="name"
        columns={columns}
        className="card-style"
        dataSource={dataSource}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Content>
  )
}
