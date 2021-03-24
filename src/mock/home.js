import Mock from 'mockjs'
import qs from 'qs'
// 提供首页的模拟接口
export default {
  brand: config => {
    const queryStr = config.url.split('?')[1]
    const queryObj = qs.parse(queryStr) || {}
    const brands = []
    const limit = queryObj.limit || 10
    for (let i = 0; i < limit; i++) {
      brands.push(Mock.mock({
        id: '@id',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_${i % 5 + 1}.jpg`,
        name: '@ctitle(6,8)',
        desc: '@ctitle(20,30)',
        place: '@city'
      }))
    }
    return {
      msg: '获取品牌成功',
      result: brands
    }
  },
  // 轮播图
  banner: config => {
    const list = []
    for (let i = 0; i < 5; i++) {
      list.push(Mock.mock({
        id: '@id',
        imgUrl: `http://zhoushugang.gitee.io/erabbit-client-pc-static/images/b${i + 1}.jpg`,
        hrefUrl: '/#/'
      }))
    }
    return {
      msg: '获取品牌成功',
      result: list
    }
  },

  // 新鲜好物
  new: config => {
    const list = []
    for (let i = 0; i < 4; i++) {
      list.push(Mock.mock({
        id: '@id',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/new_goods_${i + 1}.jpg`,
        name: '@ctitle(6,8)',
        price: '@float(100,1000,2,2)',
        desc: ''
      }))
    }
    return {
      msg: '查询新鲜好物成功',
      result: list
    }
  },
  // 人气推荐
  hot: config => {
    const list = []
    for (let i = 0; i < 4; i++) {
      list.push(Mock.mock({
        id: '@id',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/popular_${i + 1}.jpg`,
        title: '@ctitle(6,8)',
        alt: '@ctitle(4,6)'
      }))
    }
    return {
      msg: '查询人气推荐成功',
      result: list
    }
  }

}
