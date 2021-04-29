import ajax from './ajax'

// 用户登录
export const reqLogin = params => ajax('/login', params, 'POST')
