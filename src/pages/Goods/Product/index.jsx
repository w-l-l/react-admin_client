import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, Switch } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getProductList, getProductListBySearch } from '@api/goods'
import { PAGE_SIZE } from '@utils/constant'

const { Option } = Select
const { Column } = Table

export default class Product extends Component {
  // 当前页数
  currentPage = 1
  state = {
    total: 0, // 表格总数量
    productList: [], // 商品数据
    loading: false, // 表格加载动画
    searchType: 'productName', // 搜索类型
    searchName: '' // 关键字
  }
  // 获取商品列表
  getProductList = async (pageNum = 1) => {
    this.setState({ loading: true })
    this.currentPage = pageNum
    const { searchType, searchName } = this.state
    const params = {
      pageNum,
      pageSize: PAGE_SIZE
    }
    searchName && (params[searchType] = searchName)
    const { status, data } = await (searchName
      ? getProductListBySearch(params)
      : getProductList(params))
    if (status !== 0) return
    const { list: productList, total } = data
    this.setState({ productList, total, loading: false })
  }
  componentDidMount () {
    this.getProductList()
  }
  // 表格状态上下架render
  tableStatusRender = ({ status }) => (
    <Switch
      checkedChildren='上架'
      unCheckedChildren='下架'
      checked={status === 1}
    />
  )
  // 表格操作render
  tableHandleRender = () => (
    <>
      <Button type='link'>详情</Button>
      <Button type='link'>修改</Button>
    </>
  )
  render () {
    const {
      currentPage,
      getProductList,
      tableStatusRender,
      tableHandleRender
    } = this
    const { total, productList, loading, searchType } = this.state
    // 卡片左侧
    const title = (
      <>
        <Select
          placeholder='请选择搜索类型'
          style={{ width: 150 }}
          value={searchType}
          onChange={searchType => this.setState({ searchType })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          autoComplete='off'
          style={{ width: 150, margin: '0 15px' }}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type='primary' onClick={() => getProductList()}>
          搜索
        </Button>
      </>
    )
    // 卡片右侧
    const extra = (
      <Button type='primary' icon={<PlusOutlined />}>
        添加商品
      </Button>
    )
    // 后端分页设置
    const pagination = {
      current: currentPage,
      defaultPageSize: PAGE_SIZE,
      total,
      showQuickJumper: true,
      onChange: getProductList
    }
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={productList}
          pagination={pagination}
          loading={loading}
          bordered
          rowKey='_id'
        >
          <Column title='商品名称' dataIndex='name' />
          <Column title='商品描述' dataIndex='desc' />
          <Column
            title='价格'
            dataIndex='price'
            render={price => `￥${price}`}
            width='100px'
          />
          <Column title='状态' render={tableStatusRender} width='100px' />
          <Column title='操作' render={tableHandleRender} width='160px' />
        </Table>
      </Card>
    )
  }
}
