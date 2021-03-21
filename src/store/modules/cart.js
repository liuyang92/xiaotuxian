// 管理购物车信息
export default {
  // 开启命名空间
  namespaced: true,
  state: () => {
    return {
      // 购物车列表信息
      list: []
    }
  }
}
