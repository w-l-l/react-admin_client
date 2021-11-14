import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    stores: [6, 10, 25, 20, 15, 10],
    load: false
  }
  getOption = (sales, stores) => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量', '库存']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        { name: '销量', type: 'bar', data: sales },
        { name: '库存', type: 'bar', data: stores }
      ]
    }
  }
  update = _ => this.setState(({ sales, stores }) => ({
    sales: sales.map(item => item + 1),
    stores: stores.map(item => item - 1)
  }))
  componentDidMount() {
    this.setState({ load: true })
  }
  render() {
    const { sales, stores, load } = this.state
    const extra = <Button type="primary" onClick={this.update}>更新</Button>
    return (
      <Card title='柱状图一' extra={extra}>
        { load ? <ReactEcharts option={this.getOption(sales, stores)} /> : null }
      </Card>
    )
  }
}
