import React from 'react'
import { Card } from 'antd'

import { ReactEchartsCommon } from '@/components/echarts'

export default function Echarts() {
  const options = {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        lineHeight: 26,
        padding: [10, 12],
        fontSize: 12,
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    color: ['#fa5555', '#975fe4', '#facc14', '#3296fa', '#36cbcb', '#2fc25b'],
    legend: {
      bottom: 0,
      itemWidth: 6,
      itemHeight: 8,
      padding: [10, 0],
      textStyle: {
        color: '#999999',
      },
      data: ['测试', '测试2', '测试3', '测试4', '测试5', '测试6'],
    },
    grid: {
      top: '8%',
      left: '3%',
      right: '5%',
      containLabel: true,
    },
    xAxis: {
      data: [1, 2, 3, 4, 5, 6],
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: true,
        lineStyle: {
          color: '#d9d9d9',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#d9d9d9',
        },
      },
      axisLabel: {
        margin: 16,
        color: 'rgba(0, 0, 0, 0.65)',
        formatter(value: string) {
          return value.replace(/-/g, '.')
        },
      },
    },
    yAxis: {
      min: 0,
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 14,
        color: 'rgba(0, 0, 0, 0.65)',
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    series: [
      {
        type: 'line',
        name: '测试',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        data: [100, 140, 320, 230, 80, 120],
      },
      {
        type: 'line',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        name: '测试2',
        data: [10, 240, 120, 430, 180, 220],
      },
      {
        type: 'line',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        name: '测试3',
        data: [56, 56, 383, 93, 27, 90],
      },
      {
        type: 'line',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        data: [20, 60, 32, 23, 89, 30],
        name: '测试4',
      },
      {
        type: 'line',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        name: '测试5',
        data: [29, 92, 148, 150, 106, 202],
      },
      {
        type: 'line',
        smooth: true,
        symbolSize: 1,
        showSymbol: false,
        data: [50, 230, 90, 80, 231, 98],
        name: '测试6',
      },
    ],
  }

  return (
    <Card title="数据图表" style={{ marginTop: 20 }}>
      <ReactEchartsCommon option={options} style={{ height: 500 }} />
    </Card>
  )
}
