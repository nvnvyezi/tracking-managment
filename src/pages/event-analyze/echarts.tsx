import React from 'react'

import { ReactEchartsCommon } from '@/components/echarts'

export default function Echarts() {
  const options = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }

  return (
    <div>
      <h5>图标</h5>
      <ReactEchartsCommon option={options} />
    </div>
  )
}
