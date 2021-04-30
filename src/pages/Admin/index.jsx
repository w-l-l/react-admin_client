import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import './less/admin.less'

import memory from '@utils/memory'
import LeftNav from '@components/LeftNav'
import Home from '../Home'
import Category from '../Goods/Category'
import Product from '../Goods/Product'
import User from '../User'
import Role from '../Role'
import Bar from '../Charts/Bar'
import Pie from '../Charts/Pie'
import Line from '../Charts/Line'
import Order from '../Order'

const { Header, Footer, Sider, Content } = Layout

export default class Admin extends Component {
  render () {
    // 如果用户未登录，直接重定向登录页
    if (!memory.user) return <Redirect to='login' />
    return (
      <Layout className='admin'>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content className='admin-content'>
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/goods/category' component={Category} />
              <Route path='/goods/product' component={Product} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/charts/line' component={Line} />
              <Route path='/order' component={Order} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer className='admin-footer'>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
