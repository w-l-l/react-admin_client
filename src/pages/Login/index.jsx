import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { login } from '@redux/actions'

import './less/login.less'
import logo from '@assets/img/logo.png'

class Login extends Component {
  // 表单默认值
  initialValues = {
    username: 'admin',
    password: 'admin'
  }

  // 验证通过提交表单
  handleFinish = params => this.props.login(params)

  // 用户名验证规则
  validateUserName = [
    { required: true, whitespace: true, message: '用户名必须输入' },
    { min: 4, message: '用户名至少4位' },
    { max: 12, message: '用户名最多12位' },
    { pattern: /^\w+$/, message: '用户名必须是英文、数字或下划线组成' }
  ]

  // 密码自定义验证规则
  validatePassword = [
    {
      validator (_, value = '') {
        const reject = value => Promise.reject(value)
        try {
          value = value.trim()
          const { length } = value
          if (!value) return reject('密码必须输入')
          if (length < 4) return reject('密码长度不能小于4位')
          if (length > 12) return reject('密码长度不能大于12位')
          if (!/^\w+$/.test(value))
            return reject('密码必须是英文、数字或下划线组成')
          return Promise.resolve()
        } catch (error) {
          return reject('验证失败')
        }
      }
    }
  ]

  render () {
    const { user } = this.props
    // 如果用户登录，直接重定向首页
    if (user && user._id) return <Redirect to='/home' />
    const {
      handleFinish,
      validateUserName,
      validatePassword,
      initialValues
    } = this
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='logo' />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-content'>
          <div className={user.errorMsg ? 'error-msg show' : 'error-msg'}>{user.errorMsg}</div>
          <h2>用户登录</h2>
          <Form
            className='login-form'
            onFinish={handleFinish}
            initialValues={initialValues}
          >
            <Form.Item name='username' rules={validateUserName}>
              <Input
                prefix={<UserOutlined className='login-icon' />}
                placeholder='用户名'
                autoComplete='off'
              />
            </Form.Item>
            <Form.Item name='password' rules={validatePassword}>
              <Input
                prefix={<LockOutlined className='login-icon' />}
                type='password'
                placeholder='密码'
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)
