import React from 'react'

import Content from '@/layout/content'

export default function createPoint() {
  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '新增埋点' },
      ]}
    >
      <div>create track</div>
    </Content>
  )
}
