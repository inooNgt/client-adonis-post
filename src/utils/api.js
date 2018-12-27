import { get, post } from 'utils/http';
import APIMAP from 'utils/apimap';

const API = {
  login: param => post(APIMAP.login, param),
  user: () => get(APIMAP.auth.user, {}),
  posts: () => get(APIMAP.posts, {})
};

export default API;
