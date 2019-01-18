import { get, post } from 'utils/http';
import APIMAP from 'utils/apimap';

const API = {
  login: param => post(APIMAP.login, param),
  avatar: param => post(APIMAP.auth.avatar, param),
  logout: param => post(APIMAP.auth.logout, param),
  user: () => get(APIMAP.auth.user, {}),
  findUser: param => get(APIMAP.findUserByname, param),
  userfile: (data, optoins) =>
    post(APIMAP.auth.userfile, data, {
      headers: { 'Content-Type': 'image/png' }
    }),
  posts: () => get(APIMAP.posts, {}),
  postdetail: param => get(APIMAP.postdetail, param),
  create: param => post(APIMAP.auth.create, param)
};

export default API;
