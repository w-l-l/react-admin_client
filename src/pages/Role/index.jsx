import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd'

import { getRoleList } from '@api/role'
import { formatDate } from '@utils/date'
import { PAGE_SIZE } from '@utils/constant'

const { Column } = Table

export default class Role extends Component {
  state = {
    roles: [], // 所以角色列表
    loading: false,
    role: {} // 当前选中的角色信息
  }
  componentDidMount() {
    this.getRoleList()
  }
  getRoleList = async _ => {
    try {
      this.setState({ loading: true })
      const { status, data: roles } = await getRoleList()
      if (status !== 0) return
      this.setState({ roles, loading: false })
    } catch (error) {
      message.error('角色列表获取失败')
    }
  }
  render () {
    const { roles, loading, role } = this.state
    // 卡片左上方
    const title = (
      <>
        <Button type='primary' style={{ marginRight: 5 }}>创建角色</Button>
        <Button type='primary' disabled={!role._id}>设置角色权限</Button>
      </>
    )
    return (
      <Card title={title}>
        <Table
          dataSource={roles}
          rowKey='_id'
          loading={loading}
          bordered
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: role => this.setState({ role })
          }}
          onRow={role => ({
            onClick: _ => this.setState({ role })
          })}
        >
          <Column title="角色名称" dataIndex="name" />
          <Column title="创建时间" dataIndex="create_time" render={formatDate} />
          <Column title="授权时间" dataIndex="auth_time" render={formatDate} />
          <Column title="授权人" dataIndex="auth_name" />
        </Table>
      </Card>
    )
  }
}
