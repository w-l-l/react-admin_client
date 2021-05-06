import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getCategory, addCategory, updateCategory } from '@api/goods'

import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

const { Column } = Table

export default class Category extends Component {
  // 添加分类表单实例
  addFormRef = null
  // 修改分类表单实例
  updateFormRef = null
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
  cancelModal = () => {
    this.addFormRef && this.addFormRef.resetFields()
    this.updateFormRef && this.updateFormRef.resetFields()
    this.showModal(0)
  }
  // 添加分类
  addCategory = async () => {
    try {
      const params = await this.addFormRef.validateFields()
      const { status } = await addCategory(params)
      if (status !== 0) return
      message.success('添加分类成功')
      this.cancelModal()
      this.getCategory()
    } catch (error) {}
  }
  // 修改分类
  updateCategory = async () => {
    try {
      const params = await this.updateFormRef.validateFields()
      const { _id: categoryId } = this.category
      const { status } = await updateCategory({
        ...params,
        categoryId
      })
      if (status !== 0) return
      message.success('修改分类成功')
      this.cancelModal()
      this.getCategory()
    } catch (error) {}
  }
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
      addCategory,
      updateCategory,
      renderTableHanle,
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
        <Modal
          title='添加分类'
          visible={showStatus === 1}
          onCancel={cancelModal}
          onOk={addCategory}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            getFormRef={form => (this.addFormRef = form)}
          />
        </Modal>
        <Modal
          title='修改分类'
          visible={showStatus === 2}
          onCancel={cancelModal}
          onOk={updateCategory}
        >
          <UpdateForm
            categoryName={category.name}
            getFormRef={form => (this.updateFormRef = form)}
          />
        </Modal>
      </Card>
    )
  }
}
