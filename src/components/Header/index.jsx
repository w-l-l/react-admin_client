import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'antd'

import './less/header.less'

import { removeUser } from '@utils/localStorage'
import memory from '@utils/memory'

class Header extends Component {
  // 用户退出
  logout = () => {
    Modal.confirm({
      title: '您确定退出吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeUser()
        this.props.history.replace('/login')
      }
    })
  }
  render () {
    const { username } = memory.user || {}
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{username}</span>
          <Button type='link' onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>首页</div>
          <div className='header-bottom-right'>
            <span>时间</span>
            <img src='' alt='weather' />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
