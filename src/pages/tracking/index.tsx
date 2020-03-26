import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Menu,
  Form,
  Input,
  Table,
  Modal,
  Button,
  Select,
  message,
  Dropdown,
  Popconfirm,
} from 'antd'
import {
  RedoOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  InteractionOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

import { ClickParam } from 'antd/lib/menu'
import { ColumnProps } from 'antd/es/table'
import { TablePaginationConfig } from 'antd/lib/table'

import axios from '@/utils/axios'
import * as API from '@/constants/api'
import { formData, statusMap, typeMap } from '@/constants/tracking'

import Content from '@/layout/content'

interface IParamItem {
  name: string
  type: 'string' | 'boolean' | 'number'
  describe: string
}

interface ITrackingRes {
  event: string
  demand: string
  version: string
  describe: string
  principalPM: string
  params: IParamItem[]
  principalQA?: string
  principalRD?: string
  principalFE?: string
  principalIos?: string
  type: 'normal' | 'kernel'
  principalAndroid?: string
  status: 0 | 1 | 2 | 3 | 4 | 5
  system: 'ios' | 'web' | 'android' | 'web'
}

const { Option } = Select
const { confirm } = Modal

export default function CreatePoint() {
  const [form] = Form.useForm()
  const statusUpdate = React.useRef(-1)

  const [versionList, setVersionList] = React.useState([])
  const [buttonLoading, setButtonLoading] = React.useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([])
  const [dataSource, setDataSource] = React.useState<ITrackingRes[]>([])
  const [pagination, setPagination] = React.useState<TablePaginationConfig>({
    total: 0,
    current: 1,
    pageSize: 10,
    showTotal: total => `共${total}条数据`,
  })

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  const handleTableChange = React.useCallback(
    paginationNext => {
      const { current, pageSize } = paginationNext
      const skip = (current - 1) * pageSize
      const values = form.getFieldsValue()
      setButtonLoading(true)

      axios
        .get(API.tracking, { params: { ...values, skip, limit: pageSize } })
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

  const handleDelete = (item: ITrackingRes) => () => {
    axios
      .delete(API.tracking, { data: { demand: item.demand } })
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

  const handleChangeStatus = ({ demand, status }: ITrackingRes) => () => {
    confirm({
      okText: '确认',
      cancelText: '取消',
      title: `修改${demand}的埋点状态`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <span>埋点状态：</span>
          <Select
            style={{ marginTop: 20 }}
            defaultValue={status}
            onChange={value => {
              statusUpdate.current = value
            }}
          >
            {statusMap.slice(1).map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>
      ),
      onOk() {
        axios
          .patch(API.trackingStatus, { demand, status: statusUpdate.current })
          .then(() => {
            message.success('状态修改成功')
            handleTableChange(pagination)
          })
      },
    })
  }

  const columns: ColumnProps<ITrackingRes>[] = [
    {
      width: 120,
      key: 'event',
      fixed: 'left',
      title: '事件名',
      dataIndex: 'event',
    },
    {
      width: 140,
      title: '需求',
      fixed: 'left',
      key: 'demand',
      dataIndex: 'demand',
    },
    {
      width: 100,
      key: 'system',
      title: '操作系统',
      dataIndex: 'system',
    },
    {
      width: 200,
      key: 'describe',
      title: '事件描述',
      dataIndex: 'describe',
    },
    {
      width: 100,
      key: 'type',
      title: '类型',
      dataIndex: 'type',
      render: type => typeMap.find(item => item.value === type)?.label,
    },
    {
      width: 100,
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: status =>
        statusMap.find(item => item.value === Number(status))?.label,
    },
    {
      width: 400,
      key: 'params',
      title: 'Params',
      dataIndex: 'params',
      render: value =>
        value.map((item, index) => (
          <div key={item._id}>
            <h5>参数{index + 1}：</h5>
            <p>
              <span className="name">{item.name}</span>
              <span className="type">{item.type}</span>
              {item.describe}
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
        )),
    },
    {
      width: 100,
      key: 'version',
      title: '操作版本',
      dataIndex: 'version',
    },
    {
      width: 100,
      title: 'PM负责人',
      key: 'principalPM',
      dataIndex: 'principalPM',
    },
    {
      width: 200,
      title: '添加时间',
      key: 'createTime',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      width: 140,
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, row) => (
        <>
          {[0, 1, 4, 5].includes(row.status) && (
            <Link to={`create?demand=${row.demand}`}>
              <EditOutlined />
            </Link>
          )}
          <InteractionOutlined
            style={{ marginLeft: 15 }}
            onClick={handleChangeStatus(row)}
          />
          <Popconfirm
            okText="确认"
            cancelText="取消"
            onConfirm={handleDelete(row)}
            title={`确认删除${row.demand}的埋点吗?`}
          >
            <DeleteOutlined style={{ marginLeft: 15 }} />
          </Popconfirm>
        </>
      ),
    },
  ]

  function handleMenuClick(e: ClickParam) {
    axios
      .patch(API.trackingBatch, {
        status: e.key,
        demand: selectedRowKeys.join(','),
      })
      .then(() => {
        message.success('状态更新成功')
        handleTableChange(pagination)
      })
  }

  const onFinish = () => {
    handleTableChange({ current: 1, pageSize: 10 })
  }

  const handleReset = () => {
    form.resetFields()
    onFinish()
  }

  React.useEffect(() => {
    handleTableChange({ current: 1, pageSize: 10 })
    axios.get(API.trackingVersion).then(res => {
      setVersionList(res?.data || [])
    })
  }, [handleTableChange])

  function renderForm() {
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="5">拒绝</Menu.Item>
        <Menu.Item key="2">开发完成</Menu.Item>
        <Menu.Item key="3">上线</Menu.Item>
        <Menu.Item key="4">下线</Menu.Item>
      </Menu>
    )
    return (
      <div className="card-style">
        <Form form={form} name="tracking" onFinish={onFinish}>
          <Row gutter={24}>
            {formData.map(form => (
              <Col key={form.key} span={8}>
                <Form.Item
                  name={form.key}
                  label={form.label}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17, offset: 1 }}
                >
                  <Select defaultValue={form.defaultValue}>
                    {form.data.map(item => (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="demand"
                label="需求名称"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 17, offset: 1 }}
                rules={[
                  {
                    max: 30,
                    whitespace: true,
                    message: '长度不大于30',
                  },
                ]}
              >
                <Input allowClear placeholder="请输入埋点所属需求" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="event"
                label="事件名称"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 17, offset: 1 }}
                rules={[
                  {
                    max: 40,
                    whitespace: true,
                    pattern: /^\w{1,40}$/,
                    message: '仅支持字母，数字，下划线且长度不大于40',
                  },
                ]}
              >
                <Input allowClear placeholder="请输入事件名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="所属版本"
                name="version"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 17, offset: 1 }}
                rules={[
                  {
                    whitespace: true,
                    pattern: /^(\d{1,2}\.){2}\d{1,2}$/,
                    message: '版本号格式为 xx.xx.xx',
                  },
                ]}
              >
                <Select>
                  {versionList.map(item => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Form.Item>
                <Link to="create">
                  <Button type="primary">
                    <PlusOutlined />
                    新建
                  </Button>
                </Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={buttonLoading}
                  style={{ marginLeft: 10 }}
                >
                  {!buttonLoading && <SearchOutlined />}
                  查询
                </Button>
                <Button
                  type="primary"
                  onClick={handleReset}
                  loading={buttonLoading}
                  style={{ marginLeft: 10 }}
                >
                  {!buttonLoading && <RedoOutlined />}
                  重置
                </Button>
                <Dropdown overlay={menu}>
                  <Button
                    type="primary"
                    loading={buttonLoading}
                    style={{ marginLeft: 10 }}
                  >
                    批量操作 <DownOutlined />
                  </Button>
                </Dropdown>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <style jsx>{`
          div {
            margin-bottom: 20px;
            padding-bottom: 0;
          }
        `}</style>
      </div>
    )
  }

  return (
    <Content crumbData={[{ value: '埋点管理' }]}>
      {renderForm()}
      <div className="card-style">
        <Table
          bordered
          rowKey="demand"
          columns={columns}
          scroll={{ x: 800 }}
          dataSource={dataSource}
          pagination={pagination}
          rowSelection={rowSelection}
          onChange={handleTableChange}
        />
      </div>
    </Content>
  )
}
