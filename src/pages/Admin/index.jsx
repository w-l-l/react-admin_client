import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import memory from '@utils/memory'

export default class Admin extends Component {
  render () {
    // 如果用户未登录，直接重定向登录页
    if (!memory.user) return <Redirect to='login' />
    return <h1>Admin</h1>
  }
}
