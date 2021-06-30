import ajax from './ajax'

// 获取一级/二级分类
export const getCategoryList = params => ajax('/manage/category/list', params)

// 添加分类
export const addCategory = params => ajax('/manage/category/add', params, 'POST')

// 修改分类
export const updateCategory = params => ajax('/manage/category/update', params, 'POST')

// 获取商品列表
export const getProductList = params => ajax('/manage/product/list', params)

// 搜索商品列表
export const getProductListBySearch = params => ajax('/manage/product/search', params)

// 更新商品状态(上架/下架)
export const setProductStatus = params => ajax('/manage/product/updateStatus', params, 'POST')

// 获取一个分类
export const getCategoryInfo = params => ajax('/manage/category/info', params)

// 删除指定名称的图片
export const deleteImg = params => ajax('/manage/img/delete', params, 'POST')
