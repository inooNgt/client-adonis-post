/*
 * action 类型
 */

const SET_LOGINED = 'SET_LOGINED';

/*
 * action 创建函数
 */
const setLoginStatus = logined => {
  return { type: SET_LOGINED, logined };
};

const actions = { SET_LOGINED, setLoginStatus };

export default actions;
