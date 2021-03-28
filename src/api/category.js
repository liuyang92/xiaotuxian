import request from '@/utils/request'

/**
 * 获取所有分类
 */
// export const findAllCategory = () => {
//   return request('/home/category/head', 'get')
// }
// 获取顶级分类信息(包含每个二级分类及对应商品信息)
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 二级分类商品列表
 * @param {Object} params 查询参数对象
 */
export const findGoodsByCategory = (params) => {
  return request('/category/goods', 'post', params)
}
