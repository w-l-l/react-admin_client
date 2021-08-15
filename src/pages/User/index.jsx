import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd'

import { getUserList } from '@api/user'
import { formatDate } from '@utils/date'
import { PAGE_SIZE } from '@utils/constant'

const { Column } = Table

export default class User extends Component {
  roleNames = {}
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
  tableHandleRender = _ => {
    return (
      <>
        <Button type='link'>修改</Button>
        <Button type='link'>删除</Button>
      </>
    )
  }
  render () {
    const { roleNames, tableHandleRender } = this
    const { users, loading } = this.state
    const title = <Button type='primary'>创建用户</Button>
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
      </Card>
    )
  }
}
