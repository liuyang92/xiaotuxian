// 管理用户信息
export default {
  // 开启命名空间
  namespaced: true,
  state: () => {
    return {
      // 用户信息
      profile: {
        id: '',
        nickname: '',
        avatar: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    //   登陆成功,传入用户信息
    setUser (state, profile) {
      state.profile = profile
    }
  }
}
