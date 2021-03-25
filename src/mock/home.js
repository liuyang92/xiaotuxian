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
  },
  // 商品列表
  goods: config => {
    const list = []
    const images = [
      'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_cover.jpg',
      'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_cover.jpg',
      'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/kitchen_goods_cover.jpg',
      'http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/home_goods_cover.jpg'
    ]
    for (let i = 0; i < 4; i++) {
      const children = []
      for (let j = 0; j < 3; j++) {
        children.push(Mock.mock({
          id: '@id',
          name: '@ctitle(2,4)'
        }))
      }
      const goods = []
      for (let k = 0; k < 8; k++) {
        goods.push(Mock.mock({
          id: '@id',
          name: '@ctitle(12,24)',
          price: '@float(100,1000,2,2)',
          picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_${k + 1}.jpg`
        }))
      }
      list.push(Mock.mock({
        id: '@id',
        picture: images[i],
        name: '@ctitle(2,3)',
        saleInfo: '@ctitle(4,4)',
        children,
        goods
      }))
    }
    return {
      msg: '查询商品列表成功',
      result: list
    }
  },

  // 专题列表
  special: config => {
    const list = []
    for (let i = 0; i < 3; i++) {
      list.push(Mock.mock({
        id: '@id',
        cover: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/topic_goods_${i + 1}.jpg`,
        title: '@ctitle(8,12)',
        summary: '@ctitle(6,8)',
        lowestPrice: '@float(100,1000,2,2)',
        detailsUrl: '/#/',
        collectNum: '100',
        viewNum: '120',
        replyNum: '60'
      }))
    }
    return {
      msg: '查询专题列表成功',
      result: list
    }
  }

}
