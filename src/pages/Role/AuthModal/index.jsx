import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Tree, message } from 'antd'

import { updateRole } from '../../../api/role'
import menuList from '@config/menuList'
import memory from '@utils/memory'

const { Item } = Form

export default class AuthModal extends Component {
  static propTypes = {
    isShowAuth: PropTypes.bool.isRequired,
    controlModalShow: PropTypes.func.isRequired,
    getRoleList: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
  }
  state = {
    checkedKeys: []
  }
  // 树节点数据
  treeData = []
  constructor(props) {
    super(props)
    this.treeData = [{
      title: '平台权限',
      key: 'all',
      children: this.getTreeNodes(menuList)
    }]
  }
  // 设置角色权限
  updateRole = async _ => {
    const { checkedKeys } = this.state
    const { role: oldRole, getRoleList } = this.props
    const role = {...oldRole}
    role.menus = checkedKeys
    role.auth_time = Date.now()
    role.auth_name = memory.user.username
    const { status } = await updateRole(role)
    if (status !== 0) return message.error('设置角色权限失败')
    message.success('设置角色权限成功')
    this.handleCancel()
    getRoleList()
  }
  // 关闭弹窗
  handleCancel = _ => {
    const { controlModalShow } = this.props
    controlModalShow('isShowAuth', false)
    this.setState({ checkedKeys: [] })
  }
  // 生成TreeNode
  getTreeNodes = menuList => {
    return menuList.reduce((pre, { title, key, children }) => {
      const treeNode = { title, key }
      children && (treeNode.children = this.getTreeNodes(children))
      pre.push(treeNode)
      return pre
    }, [])
  }
  render() {
    const { updateRole, handleCancel, treeData } = this
    const { isShowAuth, role } = this.props
    const { checkedKeys } = this.state
    return (
      <Modal
        title='设置角色权限'
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={handleCancel}
      >
        <Item label='角色名称'>
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          treeData={treeData}
          onCheck={checkedKeys => this.setState({ checkedKeys })}
        />
      </Modal>
    )
  }
}
