import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { GithubFilled } from '@ant-design/icons'

import './less/header.less'

import { removeUser } from '@utils/localStorage'
import memory from '@utils/memory'
import { formatDate } from '@utils/date'
import menuList from '@config/menuList'

class Header extends Component {
  timer = 0 // 定时器
  state = {
    currentTime: formatDate(Date.now()) // 当前时间
  }
  componentDidMount () {
    this.getTime()
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  // 获取菜单标题
  getTitle = () => {
    const { pathname } = this.props.location
    let title = ''
    menuList.forEach(item => {
      if (item.key === pathname) title = item.title
      const { children } = item
      if (children) {
        const info = children.find(item => !pathname.indexOf(item.key))
        info && (title = info.title)
      }
    })
    return title
  }
  // 获取当前时间
  getTime = () => {
    this.timer = setInterval(() => {
      const currentTime = formatDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
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
    const { currentTime } = this.state
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，{username}</span>
          <Button type='link' onClick={this.logout}>
            退出
          </Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{this.getTitle()}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <a
              href='https://github.com/w-l-l'
              target='_blank'
              rel='nofollow noopener noreferrer'
            >
              <GithubFilled className='github' />
            </a>
            <span>多云转阴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
