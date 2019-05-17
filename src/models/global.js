
export default {

  namespace: 'global',

  state: {
    userInfo:{
      email:null,
      pwd:null,
      key:null
    },
    hello:'你好'
  },

  subscriptions: {},

  effects: {
    //dispatch 提交用户信息的地方,设置你想调用的方法
    // 第一个参数是你要传递的信息，第二个参数是你要用到的方法
    *setUserInfo({ payload }, { put }) {  // eslint-disable-line
      //yield 是调用了信息成功后才会执行的步骤
      //put方法中，type设置类型，第二个参数是payload（从外部拿到的数据）
      yield put({ type: 'set_userinfo',payload });
    },
  },

  reducers: {
    //设置用户信息 userInfo的state，把拿到的数据赋值给你的状态
    set_userinfo(state, { payload }) {
      return { ...state, userInfo:payload };
    },
  },

};
