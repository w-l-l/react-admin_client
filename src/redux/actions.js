import { message } from 'antd'
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types'
import { login as userLogin } from '@api/login'
import { saveUser, removeUser } from '@utils/localStorage'

// 设置头部标题的action
export const setHeadTitle = headTitle => ({ type: SET_HEAD_TITLE, data: headTitle })

// 接收用户的action
export const receiveUser = user => ({ type: RECEIVE_USER, user })

// 显示错误信息的action
export const showErrorMsg = errorMsg => ({ type: SHOW_ERROR_MSG, errorMsg })

// 退出登录的action
export const logout = mes => {
  removeUser()
  mes && message.success(mes)
  return { type: RESET_USER }
}

// 登录的action
export const login = params => {
  return async dispatch => {
    const { status, data, msg } = await userLogin(params)
    if(status !== 0) return dispatch(showErrorMsg(msg))
    message.success('登录成功')
    saveUser(data)
    dispatch(receiveUser(data))
  }
}
