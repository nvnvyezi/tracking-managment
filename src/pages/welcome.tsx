import React from 'react'
import { Card } from 'antd'

export default function Welcome() {
  return (
    <Card title="欢迎访问数据分析管理平台">
      <div />
      <style jsx>{`
        div {
          width: 600px;
          height: 600px;
          margin: 50px auto;
          background: url(${require('@Images/welcome.png').default}) no-repeat 0
            0 / contain;
        }
      `}</style>
    </Card>
  )
}
