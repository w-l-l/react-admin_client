import React, { Component } from 'react'
import { Card, Button, Table, message } from 'antd'

import { getRoleList } from '@api/role'
import { formatDate } from '@utils/date'
import { PAGE_SIZE } from '@utils/constant'

import AddModal from './AddModal'

const { Column } = Table

export default class Role extends Component {
  state = {
    roles: [], // 所以角色列表
    loading: false,
    role: {}, // 当前选中的角色信息
    isShowAdd: false // 是否显示创建角色弹窗
  }
  componentDidMount() {
    this.getRoleList()
  }
  // 获取角色列表
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
  // 控制弹窗显示
  controlModalShow = (attr, value) => this.setState({ [attr]: value })
  render () {
    const { controlModalShow, getRoleList } = this
    const { roles, loading, role, isShowAdd } = this.state
    // 卡片左上方
    const title = (
      <>
        <Button type='primary' style={{ marginRight: 5 }} onClick={_ => controlModalShow('isShowAdd', true)}>创建角色</Button>
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
        <AddModal isShowAdd={isShowAdd} controlModalShow={controlModalShow} getRoleList={getRoleList} />
      </Card>
    )
  }
}
