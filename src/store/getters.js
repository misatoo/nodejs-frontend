const getters = {
  token: state => {
    console.log(state.user.token);
    return state.user.token ? JSON.parse(state.user.token) : null;
  },
  userInfo: state => {
    let userInfo = {};
    if (typeof state.user.userInfo === "string") {
      userInfo = JSON.parse(state.user.userInfo);
    } else {
      userInfo = state.user.userInfo;
    }
    return userInfo;
  },
};

export default getters;
