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
    // 9个子商品
    const goods = []
    for (let i = 0; i < 9; i++) {
      goods.push(Mock.mock({
        id: '@id',
        name: '@ctitle(12,24)',
        desc: '@ctitle(10,12)',
        price: '@float(100,200,2,2)',
        picture: images[Mock.mock('@integer(0,7)')]

      }))
    }
    // 顶级分类
    return Mock.mock({
      id: '@id',
      name: item,
      children,
      goods
    })
  })
  // console.log(getHeadCategroy)
  return {
    msg: '获得头部数据分类成功',
    result: topCategoryList
  }
}
export default {
// key===>生成数据的函数
  headCategory: getHeadCategroy,
  // 根据顶级分类区获取各个分类下推荐商品
  topCategory: config => {
    const children = []
    for (let i = 0; i < 10; i++) {
      const goods = []
      for (let j = 0; j < 5; j++) {
        goods.push(Mock.mock({
          id: '@id',
          name: '@ctitle(15,20)',
          desc: '@ctitle(6,8)',
          price: '@float(10,200,2,2)',
          picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/kitchen_goods_${Mock.mock('@integer(1,8)')}.jpg`
        }))
      }
      children.push(Mock.mock({
        id: '@id',
        name: '@ctitle(2,3)',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(${Mock.mock('@integer(1,10)')}).png`,
        goods
      }))
    }
    const result = Mock.mock({
      id: '@id',
      name: '@ctitle(2,3)',
      children
    })
    return result
  }

}
