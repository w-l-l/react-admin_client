import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons'

import './less/left_nav.less'
import logo from '@assets/img/logo.png'

const { SubMenu } = Menu

export default class LeftNav extends Component {
  render () {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>谷粒后台</h1>
        </Link>
        <Menu mode='inline' theme='dark'>
          <Menu.Item key='home' icon={<PieChartOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
            <Menu.Item key='category'>
              <Link to='/goods/category'>商品分类</Link>
            </Menu.Item>
            <Menu.Item key='product'>
              <Link to='/goods/product'>商品管理</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='user' icon={<PieChartOutlined />}>
            <Link to='/user'>用户管理</Link>
          </Menu.Item>
          <Menu.Item key='role' icon={<PieChartOutlined />}>
            <Link to='/role'>角色管理</Link>
          </Menu.Item>
          <SubMenu key='sub2' icon={<MailOutlined />} title='图形图标'>
            <Menu.Item key='bar'>
              <Link to='/charts/bar'>柱状图</Link>
            </Menu.Item>
            <Menu.Item key='pie'>
              <Link to='/charts/pie'>饼图</Link>
            </Menu.Item>
            <Menu.Item key='line'>
              <Link to='/charts/line'>折线图</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='order' icon={<PieChartOutlined />}>
            <Link to='/order'>订单管理</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
