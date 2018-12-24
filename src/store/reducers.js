import { loginStatus } from './actions';

const initialState = {
  logined: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGINED':
      return { logined: action.logined };
    default:
      return state;
  }
};

export default reducer;
