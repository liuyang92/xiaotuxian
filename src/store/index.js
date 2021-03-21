import { createStore } from 'vuex'

import createPersistedstate from 'vuex-persistedstate'

// 导入用户信息
import user from './modules/user'
// 导入购物车信息
import cart from './modules/cart'
// 创建vuex仓库并导出
export default createStore({
  // 数据
  state: {
  },
  // 修改数据
  mutations: {
  },
  // 请求数据
  actions: {
  },
  // 不同模块
  modules: {
    user,
    cart
  },
  // vuex计算属性
  getters: {

  },
  // 使用插件
  plugins: [
    // 默认存储到localStrong
    // 优先本地存储,本地读取
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
