// 生成相关模拟数据

import { topCategory } from '@/api/constants'
import Mock from 'mockjs'
// 图片数据
const images = [
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(1).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(2).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(3).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(5).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(6).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(7).png',
  'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(8).png'
]
const getHeadCategroy = () => {
// 得到模拟数据,并且返回出去
// 1.导入常量:分类数据
// 2.生成和后台数据一致的顶级分类数据
// 3.在每一个顶级分类下生成二级分类
// 注意:生成的数据要随机,如:id保持唯一,图片随机
  const topCategoryList = topCategory.map(item => {
    // 生成十条二级分类数据
    const children = []
    for (let i = 0; i < 10; i++) {
      children.push(Mock.mock({
        id: '@id',
        name: '@ctitle(2,4)',
        picture: images[Mock.mock('@integer(0,7)')]
      }))
    }
    return Mock.mock({
      id: '@id',
      name: item,
      children
    })
  })
  return {
    msg: '获得头部数据分类成功',
    result: topCategoryList
  }
}

export default {
// key===>生成数据的函数
  headCategory: getHeadCategroy
}
