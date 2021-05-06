import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'

import { updateCategory } from '@api/goods'

export default class UpdateModal extends Component {
  // 表单实例
  formRef = React.createRef()
  // 验证分类名称是否输入
  validateCategoryName = [
    { required: true, whitespace: true, message: '分类名称必须输入' }
  ]
  // 隐藏弹窗
  cancelModal = () => {
    this.formRef.current.resetFields()
    this.props.cancelModal()
  }
  // 修改分类
  updateCategory = async () => {
    try {
      const params = await this.formRef.current.validateFields()
      const { category, getCategory } = this.props
      const { _id: categoryId } = category
      const { status } = await updateCategory({
        ...params,
        categoryId
      })
      if (status !== 0) return
      message.success('修改分类成功')
      this.cancelModal()
      getCategory()
    } catch (error) {}
  }
  render () {
    const { cancelModal, updateCategory, formRef, validateCategoryName } = this
    const { category, visible } = this.props
    const initialValues = {
      categoryName: category.name
    }
    return (
      <Modal
        title='修改分类'
        visible={visible}
        onCancel={cancelModal}
        onOk={updateCategory}
      >
        <Form layout='vertical' initialValues={initialValues} ref={formRef}>
          <Form.Item
            name='categoryName'
            label='分类名称：'
            rules={validateCategoryName}
          >
            <Input placeholder='请输入分类名称' autoComplete='off' />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
