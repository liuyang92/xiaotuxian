// 引入mock模拟数据
import Mock from 'mockjs'
import category from './category'
import home from './home'
import goods from './goods'

// mock设置
Mock.setup({
  // 延时300-800ms
  timeout: '300-500'
})
// 拦截请求
/**
 * 1.url --使用正则去匹配
 * 2.请求方式
 * 3.生成数据的函数
 */
Mock.mock(/\/home\/category\/head/, 'get', category.headCategory)
Mock.mock(/\/home\/brand\.*/, 'get', home.brand)
Mock.mock(/\/home\/banner\.*/, 'get', home.banner)
Mock.mock(/\/home\/new\.*/, 'get', home.new)
Mock.mock(/\/home\/hot\.*/, 'get', home.hot)
Mock.mock(/\/home\/goods\.*/, 'get', home.goods)
Mock.mock(/\/home\/special\.*/, 'get', home.special)
Mock.mock(/\/category\/sub\/filter/, 'get', category.filter)
Mock.mock(/\/category/, 'get', category.topCategory)
Mock.mock(/\/category\/goods/, 'post', category.goods)
Mock.mock(/\/goods\/relevant/, 'get', goods.relevant)
Mock.mock(/\/goods\/hot/, 'get', goods.hot)
