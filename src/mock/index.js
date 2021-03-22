// 引入mock模拟数据
import Mock from 'mockjs'
import category from './category'

// mock设置
Mock.setup({
  // 延时300-800ms
  timeout: '300-800'
})
// 拦截请求
/**
 * 1.url --使用正则去匹配
 * 2.请求方式
 * 3.生成数据的函数
 */
Mock.mock(/\/home\/category\/head/, 'get', category.headCategory)