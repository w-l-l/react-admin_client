import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Tree, message } from 'antd'
import { connect } from 'react-redux'

import { updateRole } from '@api/role'
import menuList from '@config/menuList'
import { logout } from '@redux/actions'

const { Item } = Form

class AuthModal extends Component {
  static propTypes = {
    isShowAuth: PropTypes.bool.isRequired,
    controlState: PropTypes.func.isRequired,
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
  static getDerivedStateFromProps(props, state) {
    const { role: { menus = [] }, isShowAuth } = props
    const { checkedKeys } = state
    return {
      checkedKeys: isShowAuth ? checkedKeys : menus
    }
  }
  // 设置角色权限
  updateRole = async _ => {
    const { checkedKeys } = this.state
    const { role: oldRole, getRoleList, controlState, user, logout } = this.props
    const role = {...oldRole}
    role.menus = checkedKeys
    role.auth_time = Date.now()
    role.auth_name = user.username
    const { status, data } = await updateRole(role)
    if (status !== 0) return message.error('设置角色权限失败')
    if (role._id === user.role_id) return logout('当前用户角色权限设置成功，请重新登陆')
    message.success('设置角色权限成功')
    controlState('role', data)
    this.handleCancel()
    getRoleList()
  }
  // 关闭弹窗
  handleCancel = _ => {
    const { controlState } = this.props
    controlState('isShowAuth', false)
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

export default connect(
  state => ({ user: state.user }),
  { logout }
)(withRouter(AuthModal))
