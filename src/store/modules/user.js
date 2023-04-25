// 用户信息
export default {
  namespaced: true,
  state: {
    token: window.localStorage.getItem("tk") || null, // token
    userInfo: window.localStorage.getItem("userInfo") || "{}", // 用户信息
  },
  mutations: {
    // 保存 token
    setToken(state, value) {
      state.token = value;
      console.log(JSON.stringify(value));
      window.localStorage.setItem("tk", JSON.stringify(value));
    },
    // 保存用户信息
    setUserInfo(state, value) {
      state.userInfo = value;
      console.log(JSON.stringify(value));
      window.localStorage.setItem("userInfo", JSON.stringify(value));
    },
  },
  actions: {},
};
