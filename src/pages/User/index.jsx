import React, { Component, createRef } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'

import { getUserList, delUser } from '@api/user'
import { formatDate } from '@utils/date'
import { PAGE_SIZE } from '@utils/constant'

import AddUpdateModal from './AddUpdateModal'

const { Column } = Table

export default class User extends Component {
  roleNames = {}
  addUpdateModalRef = createRef()
  state = {
    users: [],
    roles: [],
    loading: false
  }
  componentDidMount() {
    this.getUserList()
  }
  getUserList = async _ => {
    try {
      this.setState({ loading: true })
      const { status, data: { users = [], roles = [] } } = await getUserList()
      if (status !== 0) return
      this.initRoleNames(roles)
      this.setState({ users, roles, loading: false })
    } catch (error) {
      message.error('用户列表获取失败')
    }
  }
  initRoleNames = roles => {
    const roleNames = roles.reduce((total, item) => {
      total[item._id] = item.name
      return total
    }, {})
    this.roleNames = roleNames
  }
  delUser = ({ username, _id }) => {
    Modal.confirm({
      title: `确定删除${username}吗？`,
      onOk: async _ => {
        const { status } = await delUser({ userId: _id })
        if (status !== 0) return
        message.error('删除用户成功！')
        this.getUserList()
      }
    })
  }
  showAddUpdateModal = _ => {
    this.addUpdateModalRef.current.show()
  }
  tableHandleRender = user => {
    return (
      <>
        <Button type='link'>修改</Button>
        <Button type='link' onClick={_ => this.delUser(user)}>删除</Button>
      </>
    )
  }
  render () {
    const { roleNames, tableHandleRender, addUpdateModalRef, showAddUpdateModal, getUserList } = this
    const { users, loading, roles } = this.state
    const title = <Button type='primary' onClick={showAddUpdateModal}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          dataSource={users}
          rowKey='_id'
          loading={loading}
          bordered
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        >
          <Column title='用户名' dataIndex='username' />
          <Column title='邮箱' dataIndex='email' />
          <Column title='电话' dataIndex='phone' />
          <Column title='注册时间' dataIndex='create_time' render={formatDate} />
          <Column title='所属角色' dataIndex='role_id' render={role_id => roleNames[role_id]} />
          <Column title='操作' width='160px' render={tableHandleRender} />
        </Table>
        <AddUpdateModal roles={roles} getUserList={getUserList} ref={addUpdateModalRef}/>
      </Card>
    )
  }
}
