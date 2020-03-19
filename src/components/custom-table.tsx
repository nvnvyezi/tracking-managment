import React from 'react'

import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'

interface ICustomTableProps<RecordType> extends TableProps<RecordType> {
  fetch?: () => void
}

export default function CustomTable({
  fetch,
  ...tableProps
}: ICustomTableProps<any>) {
  const [pagination, setPagination] = React.useState({
    current: 1,
    total: 0,
    pageSize: 2,
  })

  return <Table bordered pagination={pagination} {...tableProps} />
}
