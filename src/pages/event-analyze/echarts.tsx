import React from 'react'
import dayjs from 'dayjs'
import { Card } from 'antd'

import * as API from '@/constants/api'
import axios from '@/utils/axios'

import { ReactEchartsCommon } from '@/components/echarts'

import { IFieldsValue } from './table'

interface IEchartsProps {
  fieldsValue: IFieldsValue
}

interface IDataState {
  time: string
  total: number
}

export default function Echarts({ fieldsValue }: IEchartsProps) {
  const [data, setData] = React.useState<IDataState[]>([])
  const options = React.useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        textStyle: {
          lineHeight: 26,
          padding: [10, 12],
          fontSize: 12,
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      color: ['#3296fa'],
      legend: {
        bottom: 0,
        itemWidth: 6,
        itemHeight: 8,
        textStyle: {
          color: '#999999',
        },
        data: [fieldsValue.event],
      },
      grid: {
        top: '8%',
        left: '3%',
        right: '5%',
        containLabel: true,
      },
      xAxis: {
        data: data.map(item => item.time),
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
          smooth: true,
          symbolSize: 1,
          showSymbol: false,
          name: fieldsValue.event,
          data: data.map(item => item.total),
        },
      ],
    }),
    [fieldsValue.event, data],
  )

  React.useEffect(() => {
    const { demand, event, date } = fieldsValue
    if (!event || !demand) {
      return
    }

    axios
      .get(API.eventCount, {
        params: {
          event,
          demand,
          startTime: dayjs(date?.[0]).format('YYYY-MM-DD'),
          endTime: dayjs(date?.[1]).format('YYYY-MM-DD'),
        },
      })
      .then(res => {
        setData(res.data)
      })
  }, [fieldsValue])

  return (
    <Card title="数据图表" style={{ marginTop: 20 }}>
      <ReactEchartsCommon option={options} style={{ height: 300 }} />
    </Card>
  )
}
