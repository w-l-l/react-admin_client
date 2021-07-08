import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, message } from 'antd'

import { addRole } from '@api/role'

const { Item } = Form

export default class AddModal extends Component {
  static propTypes = {
    isShowAdd: PropTypes.bool.isRequired,
    controlModalShow: PropTypes.func.isRequired,
    getRoleList: PropTypes.func.isRequired
  }
  // 表单ref
  addFormRef = createRef()
  // 创建角色
  addRole = async _ => {
    try {
      const params = await this.addFormRef.current.validateFields()
      const { status } = await addRole(params)
      if (status !== 0) return message.error('创建角色失败')
      message.success('创建角色成功')
      this.handleCancel()
      this.props.getRoleList()
    } catch (error) {}
  }
  // 关闭弹窗
  handleCancel = _ => {
    const { controlModalShow } = this.props
    this.addFormRef.current.resetFields()
    controlModalShow('isShowAdd', false)
  }
  render () {
    const { addRole, handleCancel, addFormRef } = this
    const { isShowAdd } = this.props
    return (
      <div>
        <Modal
          title='创建角色'
          visible={isShowAdd}
          onOk={addRole}
          onCancel={handleCancel}
        >
          <Form ref={addFormRef}>
            <Item label='角色名称' name='roleName' rules={[{ required: true, message: '角色名称必须输入' }]}>
              <Input placeholder='请输入角色名称' autoComplete='off' />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
