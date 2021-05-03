import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { getCategory, addCategory } from '@api/goods'

import AddForm from './AddForm'

const { Column } = Table

export default class Category extends Component {
  // 添加分类表单实例
  addFormRef = null
  state = {
    categorys: [], // 一级分类
    showStatus: false,
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
  // 显示添加分类弹窗
  showAddModal = () => {
    this.setState({
      showStatus: true
    })
  }
  // 隐藏弹窗
  cancelModal = () => {
    this.setState({
      showStatus: false
    })
  }
  // 添加分类
  addCategory = async () => {
    try {
      const params = await this.addFormRef.validateFields()
      const { status } = await addCategory(params)
      if (status !== 0) return
      message.success('添加分类成功')
      this.addFormRef.resetFields()
      this.cancelModal()
      this.getCategory()
    } catch (error) {}
  }
  // 表格操作列渲染
  renderTableHanle = () => (
    <>
      <Button type='link'>修改分类</Button>
      <Button type='link'>查看子分类</Button>
    </>
  )
  render () {
    const { showAddModal, cancelModal, addCategory, renderTableHanle } = this
    const { categorys, showStatus, parentId } = this.state
    return (
      <Card
        title='一级分类列表'
        extra={
          <Button type='primary' icon={<PlusOutlined />} onClick={showAddModal}>
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
          visible={showStatus}
          onCancel={cancelModal}
          onOk={addCategory}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            getFormRef={form => (this.addFormRef = form)}
          />
        </Modal>
      </Card>
    )
  }
}
