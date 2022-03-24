const $user = {
  state: {
    // 用户信息
    userInfo: {},
    // 登录凭证
    token: '',
    // 获取到的菜单列表
    menuList: [],
    // 平台的默认信息
    plateDic: {
      platformLogo: ''
    }
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
      sessionStorage.setItem('token', data);
    },
    SET_USER_INFO: (state, data) => {
      state.userInfo = data;
    },
    SET_USER_INFO_CLEAR: (state) => {
      state.userInfo = {};
    },
    SET_MENU_LIST: (state, data) => {
      state.menuList = data;
      sessionStorage.setItem('menuList', JSON.stringify(data));
    }
  },
  actions: {
    GetUserName({ commit }, data) {
      commit('GET_USERNAME', data);
    }
  }
};

export default $user;
