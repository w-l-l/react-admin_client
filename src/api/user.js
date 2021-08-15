import ajax from './ajax'

// 获取用户列表
export const getUserList = _ => ajax('/manage/user/list')

// 删除用户
export const delUser = params => ajax('/manage/user/delete', params, 'POST')

// 添加用户
export const addUser = params => ajax('/manage/user/add', params, 'POST')
