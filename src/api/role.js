import ajax from './ajax'

// 获取角色列表
export const getRoleList = _ => ajax('/manage/role/list')

// 创建角色
export const addRole = params => ajax('/manage/role/add', params, 'POST')

// 修改角色
export const updateRole = params => ajax('/manage/role/update', params, 'POST')
