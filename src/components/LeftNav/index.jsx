import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { connect } from 'react-redux'

import './less/left_nav.less'
import logo from '@assets/img/logo.png'

import menuList from '@config/menuList'
import { setHeadTitle } from '@redux/actions'

const { SubMenu } = Menu

class LeftNav extends Component {
  constructor (props) {
    super(props)

    // 默认展开的 SubMenu 菜单项 key 数组
    this.defaultOpenKeys = []

    // 获取菜单结构
    this.menuList = this.createMenuList(menuList)
  }
  // 判断权限
  hasAuth = item => {
    const { key, isPublic } = item
    const { role: { menus }, username } = this.props.user
    if (username === 'admin' || isPublic || ~menus.indexOf(key)) {
      return true
    } else if (item.children) {
      return !!item.children.some(item => ~menus.indexOf(item.key))
    }
    return false
  }
  // 动态创建菜单
  createMenuList = menu => {
    // 获取当前路径
    const { location: { pathname }, setHeadTitle } = this.props
    return menu.reduce((total, item) => {
      if (!this.hasAuth(item)) return total
      const { title, key, icon, children } = item
      if (children) {
        // 获取需要展开的 SubMenu 菜单项 key 数组
        const isOpenKey = children.some(item => !pathname.indexOf(item.key))
        isOpenKey && (this.defaultOpenKeys = [key])
        total.push((
          <SubMenu key={key} icon={icon} title={title}>
            {this.createMenuList(children)}
          </SubMenu>
        ))
      } else {
        if(item.key === pathname || !pathname.indexOf(item.key)) setHeadTitle(item.title)
        total.push((
          <Menu.Item key={key} icon={icon} onClick={_ => setHeadTitle(item.title)}>
            <Link to={key}>{title}</Link>
          </Menu.Item>
        ))
      }
      return total
    }, [])
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

export default connect(
  state => ({ user: state.user }),
  { setHeadTitle }
)(withRouter(LeftNav))
