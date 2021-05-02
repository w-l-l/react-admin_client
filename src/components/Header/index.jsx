import React, { Component } from 'react'
import { Button } from 'antd'

import './less/header.less'

export default class Header extends Component {
  render () {
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎，admin</span>
          <Button type="link">退出</Button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>首页</div>
          <div className='header-bottom-right'>
            <span>时间</span>
            <img src="" alt="weather"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
