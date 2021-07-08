import ajax from './ajax'

// 获取角色列表
export const getRoleList = _ => ajax('/manage/role/list')
