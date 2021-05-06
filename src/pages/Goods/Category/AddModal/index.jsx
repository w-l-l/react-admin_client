import React, { Component } from 'react'
import { Modal, Form, Select, Input,message } from 'antd'

import { addCategory } from '@api/goods'

const { Option } = Select

export default class AddModal extends Component {
  // 表单实例
  formRef = React.createRef()
  // 设置选择项
  setSelectOption = () => {
    return this.props.categorys.map(({ _id, name }) => (
      <Option value={_id} key={_id}>
        {name}
      </Option>
    ))
  }
  // 验证所属分类是否选择
  validateParentId = [{ required: true, message: '请选择所属分类' }]
  // 验证分类名称是否输入
  validateCategoryName = [
    { required: true, whitespace: true, message: '分类名称必须输入' }
  ]
  // 隐藏弹窗
  cancelModal = () => {
    this.formRef.current.resetFields()
    this.props.cancelModal()
  }
  // 添加分类
  addCategory = async () => {
    try {
      const params = await this.formRef.current.validateFields()
      const { status } = await addCategory(params)
      if (status !== 0) return
      message.success('添加分类成功')
      this.cancelModal()
      this.props.getCategory()
    } catch (error) {}
  }
  render () {
    const {
      formRef,
      setSelectOption,
      validateParentId,
      validateCategoryName,
      addCategory,
      cancelModal
    } = this
    const { visible, parentId } = this.props
    // 表单默认值
    const initialValues = {
      parentId,
      categoryName: ''
    }
    return (
      <Modal
        title='添加分类'
        visible={visible}
        onCancel={cancelModal}
        onOk={addCategory}
      >
        <Form layout='vertical' initialValues={initialValues} ref={formRef}>
          <Form.Item
            name='parentId'
            label='所属分类：'
            rules={validateParentId}
          >
            <Select placeholder='请选择所属分类'>
              <Option value='0'>一级分类</Option>
              {setSelectOption()}
            </Select>
          </Form.Item>
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
