import { get, post } from 'utils/http';
import APIMAP from 'utils/apimap';

const API = {
  login: param => post(APIMAP.login, param),
  user: () => get(APIMAP.auth.user, {}),
  userfile: (data, optoins) =>
    post(APIMAP.auth.userfile, data, {
      headers: { 'Content-Type': 'image/png' }
    }),
  posts: () => get(APIMAP.posts, {})
};

export default API;
