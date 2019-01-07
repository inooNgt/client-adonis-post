/*
 * action 常量
 */

const SET_LOGINED = 'SET_LOGINED';
const SET_USER = 'SET_USER';

/*
 * action 函数
 */
const setLoginStatus = logined => {
  return { type: SET_LOGINED, logined };
};

const setUser = data => {
  return { type: SET_USER, data };
};

export { SET_LOGINED, setLoginStatus, setUser };
