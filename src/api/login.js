import ajax from './ajax'

// 用户登录
export const login = params => ajax('/login', params, 'POST')
