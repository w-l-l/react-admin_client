import ajax from './ajax'

// 获取用户列表
export const getUserList = _ => ajax('/manage/user/list')
