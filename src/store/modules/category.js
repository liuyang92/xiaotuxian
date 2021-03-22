// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findHeadCategory } from '@/api/home'
export default {
  namespaced: true,
  state: () => {
    return {
      // 如果是[],看不见磨人的9个分类,需要数据加载完毕才出现
      list: topCategory.map(item => ({ name: item }))
    }
  },
  //   数据加载完毕后需要修改list
  mutations: {
    //   给list改值方法
    setCategory (state, headCategory) {
      state.list = headCategory
    },
    // 给open改值的方法
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  //   获取数据
  actions: {
    async  getCategory ({ commit }) {
      const { result } = await findHeadCategory()
      //   给一级分类添加一个显示隐藏的数据open
      result.forEach(item => {
        item.open = false
      })
      // 把获取的数据存储到list
      commit('setCategory', result)
    }

  }
}
