import { combineReducers } from 'redux'
import { SET_HEAD_TITLE } from './action-types'
import { getUser } from '@utils/localStorage'

// 管理头部标题
const initHeadTitle = '首页'

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

// 管理登录用户
const initUser = getUser()

function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  headTitle,
  user
})
