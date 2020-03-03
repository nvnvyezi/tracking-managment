import React from 'react'

import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/Table'

export default function CustomTable(props: TableProps<any>) {
  return <Table bordered {...props} />
}
