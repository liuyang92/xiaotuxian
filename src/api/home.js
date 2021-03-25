// 首页接口
import request from '@/utils/request'
// 首页上部导航栏数据
export const findHeadCategory = () => {
  return request('/home/category/head', 'get')
}

// 左侧导航栏数据
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}

// 获取轮播图
export const findBanner = () => {
  return request('/home/banner', 'get')
}
// 获取新鲜好物数据
export const findNew = () => {
  return request('/home/new', 'get')
}
// 热门推荐
export const findHot = () => {
  return request('home/hot', 'get')
}
// 获取商品
export const findGoods = () => {
  return request('home/goods', 'get')
}
// 获取专题
export const findSpecial = () => {
  return request('home/special', 'get')
}
