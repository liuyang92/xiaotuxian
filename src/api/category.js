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
