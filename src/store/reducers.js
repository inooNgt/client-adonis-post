import { combineReducers } from 'redux';

const initialState = {
  logined: false,
  user: {}
};

const loginStatus = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGINED':
      return { logined: action.logined };
    default:
      return state;
  }
};

const user = (state = initialState, action) => {
  if (action.type === 'SET_USER') return action.data;
  return {};
};

export default combineReducers({
  loginStatus,
  user
});
