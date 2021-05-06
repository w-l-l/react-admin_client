import React, { Component } from 'react'
import { Form, Input } from 'antd'

export default class UpdateForm extends Component {
  // 表单实例
  formRef = React.createRef()
  // 验证分类名称是否输入
  validateCategoryName = [
    { required: true, whitespace: true, message: '分类名称必须输入' }
  ]
  componentDidMount() {
    this.props.getFormRef(this.formRef.current)
  }
  render () {
    const { formRef, validateCategoryName } = this
    const initialValues = {
      categoryName: this.props.categoryName
    }
    return (
      <Form layout='vertical' initialValues={initialValues} ref={formRef}>
        <Form.Item
          name='categoryName'
          label='分类名称：'
          rules={validateCategoryName}
        >
          <Input placeholder='请输入分类名称' autoComplete='off' />
        </Form.Item>
      </Form>
    )
  }
}
