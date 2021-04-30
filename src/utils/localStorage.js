import memory from './memory'

const USER_KEY = 'user_key'

// 保存用户信息
export const saveUser = user => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  memory.user = user
}

// 读取用户信息
export const getUser = () => JSON.parse(window.localStorage.getItem(USER_KEY))

// 删除用户用户信息
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
  memory.user = null
}
