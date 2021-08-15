import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd'

import { addUser } from '@api/user'

const { Item } = Form
const { Option } = Select

export default class AddUpdateModal extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    getUserList: PropTypes.func.isRequired
  }
  formRef = createRef()
  state = {
    isModalVisible: false
  }
  show = _ => {
    this.setState({ isModalVisible: true })
  }
  handleOk = async _ => {
    const params = await this.formRef.current.validateFields()
    const { status } = await addUser(params)
    if (status !== 0) return
    message.success('添加用户成功')
    this.props.getUserList()
    this.handleCancel()
  }
  handleCancel = _ => {
    this.formRef.current.resetFields()
    this.setState({ isModalVisible: false })
  }
  render () {
    const { handleOk, handleCancel, formRef } = this
    const { isModalVisible } = this.state
    const { roles } = this.props
    return (
      <Modal
        title='添加用户'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={formRef} labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
          <Item label='用户名' name='username' rules={[{ required: true, message: '用户名必须输入' }]}>
            <Input placeholder='请输入用户名' autoComplete='off' />
          </Item>
          <Item label='密码' name='password' rules={[{ required: true, message: '密码必须输入' }]}>
            <Input type='password' placeholder='请输入密码' autoComplete='off' />
          </Item>
          <Item label='手机号' name='phone' rules={[{ required: true, message: '手机号必须输入' }]}>
            <Input placeholder='请输入手机号' autoComplete='off' />
          </Item>
          <Item label='邮箱' name='email' rules={[{ required: true, message: '邮箱必须输入' }]}>
            <Input placeholder='请输入邮箱' autoComplete='off' />
          </Item>
          <Item label='角色' name='role_id' rules={[{ required: true, message: '请选择角色' }]}>
            <Select placeholder='请选择角色' allowClear showSearch optionFilterProp='children'>
              { roles.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>) }
            </Select>
          </Item>
        </Form>
      </Modal>
    )
  }
}
