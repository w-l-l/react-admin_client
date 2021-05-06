import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getCategory } from '@api/goods'

import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

const { Column } = Table

export default class Category extends Component {
  // 当前正在修改的分类
  category = {}
  state = {
    categorys: [], // 一级分类
    showStatus: 0, // 0 隐藏 1 添加 2 修改
    parentId: '0'
  }
  componentDidMount () {
    this.getCategory()
  }
  // 获取分类
  getCategory = async () => {
    const { parentId } = this.state
    const { status, data: categorys } = await getCategory({ parentId })
    if (status !== 0) return
    this.setState({ categorys })
  }
  // 控制显示状态
  showModal = n => {
    this.setState({
      showStatus: n
    })
  }
  // 显示修改弹窗
  showUpdateModal = data => {
    this.category = data
    this.showModal(2)
  }
  // 隐藏弹窗
  cancelModal = () => this.showModal(0)
  // 表格操作列渲染
  renderTableHanle = data => (
    <>
      <Button type='link' onClick={() => this.showUpdateModal(data)}>
        修改分类
      </Button>
      <Button type='link'>查看子分类</Button>
    </>
  )
  render () {
    const {
      showModal,
      cancelModal,
      renderTableHanle,
      getCategory,
      category
    } = this
    const { categorys, showStatus, parentId } = this.state
    return (
      <Card
        title='一级分类列表'
        extra={
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => showModal(1)}
          >
            添加
          </Button>
        }
      >
        <Table dataSource={categorys} rowKey='_id' bordered>
          <Column title='分类名称' dataIndex='name'></Column>
          <Column title='操作' render={renderTableHanle} width='300px'></Column>
        </Table>
        <AddModal
          visible={showStatus === 1}
          cancelModal={cancelModal}
          categorys={categorys}
          parentId={parentId}
          getCategory={getCategory}
        />
        <UpdateModal
          visible={showStatus === 2}
          cancelModal={cancelModal}
          category={category}
          getCategory={getCategory}
        />
      </Card>
    )
  }
}
