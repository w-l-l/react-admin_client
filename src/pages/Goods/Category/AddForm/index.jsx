import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'

const { Option } = Select

export default class AddForm extends Component {
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
  componentDidMount () {
    this.props.getFormRef(this.formRef.current)
  }
  render () {
    const {
      setSelectOption,
      validateParentId,
      validateCategoryName,
      formRef
    } = this
    // 表单默认值
    const initialValues = {
      parentId: this.props.parentId,
      categoryName: ''
    }
    return (
      <Form layout='vertical' initialValues={initialValues} ref={formRef}>
        <Form.Item name='parentId' label='所属分类：' rules={validateParentId}>
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
    )
  }
}
