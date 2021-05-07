import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'

import { getCategory } from '@api/goods'

import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

const { Column } = Table

export default class Category extends Component {
  // 当前正在修改的分类
  category = {}
  state = {
    categorys: [], // 一级分类
    subCategorys: [], // 二级分类
    showStatus: 0, // 0 隐藏 1 添加 2 修改
    parentId: '0', // 父级分类Id
    parentName: '', // 父级分类Name
    loading: false // 表格加载状态
  }
  componentDidMount () {
    this.getCategory()
  }
  // 获取一二级分类
  getCategory = async categoryId => {
    try {
      const { parentId } = this.state
      if (categoryId && categoryId !== parentId) return
      this.setState({ loading: true })
      const { status, data } = await getCategory({ parentId })
      if (status !== 0) return
      const key = parentId === '0' ? 'categorys' : 'subCategorys'
      this.setState({ [key]: data, loading: false })
    } catch (error) {}
  }
  // 查看子分类
  getSubCategory = ({ _id, name }) => {
    this.setState({ parentId: _id, parentName: name }, this.getCategory)
  }
  // 返回一级分类
  showCategorys = () => {
    this.setState(
      { parentId: '0', parentName: '', subCategorys: [] },
      this.getCategory
    )
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
  render () {
    const {
      showModal,
      cancelModal,
      getCategory,
      category,
      showCategorys
    } = this
    const {
      categorys,
      subCategorys,
      showStatus,
      parentId,
      parentName,
      loading
    } = this.state
    const isParentId = parentId === '0'
    // 表格操作列渲染
    const renderTableHanle = data => (
      <>
        <Button type='link' onClick={() => this.showUpdateModal(data)}>
          修改分类
        </Button>
        {isParentId ? (
          <Button type='link' onClick={() => this.getSubCategory(data)}>
            查看子分类
          </Button>
        ) : null}
      </>
    )
    // 卡片右上方
    const extra = (
      <Button
        type='primary'
        icon={<PlusOutlined />}
        onClick={() => showModal(1)}
      >
        添加
      </Button>
    )
    // 卡片标题
    const title = isParentId ? (
      '一级分类列表'
    ) : (
      <>
        <Button
          type='link'
          onClick={showCategorys}
          style={{ padding: 0, fontSize: 16 }}
        >
          一级分类列表
        </Button>
        <ArrowRightOutlined style={{ margin: '0 5px' }} />
        <span>{parentName}</span>
      </>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={isParentId ? categorys : subCategorys}
          rowKey='_id'
          bordered
          loading={loading}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        >
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
