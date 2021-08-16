import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, message } from 'antd'

import { addUser, updateUser } from '@api/user'

const { Item } = Form
const { Option } = Select

export default class AddUpdateModal extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    getUserList: PropTypes.func.isRequired
  }
  formRef = createRef()
  user = {}
  state = {
    isModalVisible: false
  }
  show = user => {
    this.user = user || {}
    this.setState({ isModalVisible: true })
  }
  handleOk = async _ => {
    const params = await this.formRef.current.validateFields()
    const { user, handleCancel } = this
    if (user._id) params._id = user._id
    const { status } = await (user._id ? updateUser(params) : addUser(params))
    if (status !== 0) return
    message.success(`${user._id ? '修改' : '添加'}用户成功`)
    this.props.getUserList()
    handleCancel()
  }
  handleCancel = _ => {
    this.formRef.current.resetFields()
    this.setState({ isModalVisible: false })
  }
  render () {
    const { handleOk, handleCancel, formRef, user } = this
    const { isModalVisible } = this.state
    const { roles } = this.props
    return (
      <Modal
        title={`${user._id ? '修改' : '添加'}用户`}
        visible={isModalVisible}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form preserve={false} ref={formRef} labelCol={{ span: 4 }} wrapperCol={{ span: 15 }} initialValues={user}>
          <Item label='用户名' name='username' rules={[{ required: true, message: '用户名必须输入' }]}>
            <Input placeholder='请输入用户名' autoComplete='off' />
          </Item>
          {
            user._id ? null : (
              <Item label='密码' name='password' rules={[{ required: true, message: '密码必须输入' }]}>
                <Input type='password' placeholder='请输入密码' autoComplete='off' />
              </Item>
            )
          }
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
