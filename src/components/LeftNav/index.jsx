import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'

import './less/left_nav.less'
import logo from '@assets/img/logo.png'

import menuList from '@config/menuList'

const { SubMenu } = Menu

class LeftNav extends Component {
  constructor (props) {
    super(props)

    // 默认展开的 SubMenu 菜单项 key 数组
    this.defaultOpenKeys = []

    // 获取菜单结构
    this.menuList = this.createMenuList(menuList)
  }
  // 动态创建菜单
  createMenuList = menu => {
    // 获取当前路径
    const { pathname } = this.props.location
    return menu.map(({ title, key, icon, children }) => {
      if (children) {
        // 获取需要展开的 SubMenu 菜单项 key 数组
        const isOpenKey = children.some(item => !pathname.indexOf(item.key))
        isOpenKey && (this.defaultOpenKeys = [key])
        return (
          <SubMenu key={key} icon={icon} title={title}>
            {this.createMenuList(children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={key} icon={icon}>
            <Link to={key}>{title}</Link>
          </Menu.Item>
        )
      }
    })
  }
  render () {
    const { defaultOpenKeys, menuList } = this

    // 获取当前路径
    let { pathname } = this.props.location
    if (!pathname.indexOf('/goods/product')) pathname = '/goods/product'

    // 获取需要展开的 SubMenu 菜单项 key 数组
    // const defaultOpenKeys = /^(\/.+)\/.+$/.test(pathname) ? [RegExp.$1] : []
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>谷粒后台</h1>
        </Link>
        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={[pathname]}
          defaultOpenKeys={defaultOpenKeys}
        >
          {menuList}
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
