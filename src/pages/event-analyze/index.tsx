import React from 'react'

import Content from '@/layout/content'

export default function EventAnalyze() {
  return (
    <Content
      crumbData={[
        { label: '/home/welcome', value: '首页' },
        { label: '', value: '事件分析' },
      ]}
    >
      <div>event</div>
    </Content>
  )
}
