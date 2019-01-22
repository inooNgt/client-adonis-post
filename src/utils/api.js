import { get, post } from 'utils/http';
import APIMAP from 'utils/apimap';

const API = {
  login: param => post(APIMAP.login, param),
  register: param => post(APIMAP.register, param),
  avatar: param => post(APIMAP.auth.avatar, param),
  logout: param => post(APIMAP.auth.logout, param),
  user: param => get(APIMAP.auth.user, param),
  myPosts: param => get(APIMAP.auth.myPosts, param),
  findUser: param => get(APIMAP.findUserByname, param),
  userfile: (data, optoins) =>
    post(APIMAP.auth.userfile, data, {
      headers: { 'Content-Type': 'image/png' }
    }),
  posts: param => get(APIMAP.posts, param),
  postdetail: param => get(APIMAP.postdetail, param),
  create: param => post(APIMAP.auth.create, param),
  updatePost: param => post(APIMAP.auth.updatePost, param)
};

export default API;
