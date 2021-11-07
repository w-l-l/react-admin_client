const USER_KEY = 'user_key'

// 保存用户信息
export const saveUser = user => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// 读取用户信息
export const getUser = _ => JSON.parse(window.localStorage.getItem(USER_KEY)) || {}

// 删除用户用户信息
export const removeUser = _ => window.localStorage.removeItem(USER_KEY)
