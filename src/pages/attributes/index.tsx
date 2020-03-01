import React from 'react'

import Content from '@/layout/content'

import './index.scss'

export default function Attributes() {
  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '属性管理' },
      ]}
    >
      <div>event</div>
    </Content>
  )
}
