import ajax from './ajax'

// 获取一级/二级分类
export const getCategory = params => ajax('/manage/category/list', params)

// 添加分类
export const addCategory = params => ajax('/manage/category/add', params, 'POST')

// 修改分类
export const updateCategory = params => ajax('/manage/category/update', params, 'POST')