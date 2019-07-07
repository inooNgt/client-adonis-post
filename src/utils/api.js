import { get, post, del } from 'utils/http';
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
  create: param => post(APIMAP.auth.create, param),
  posts: param => get(APIMAP.posts, param),
  notes: param => get(APIMAP.notes, param),
  postdetail: param => get(APIMAP.postdetail, param),
  updatePost: param => post(APIMAP.auth.updatePost, param),
  deletePost: param => del(APIMAP.auth.deletePost, param),
  createNote: param => post(APIMAP.auth.createNote, param),
  notedetail: param => get(APIMAP.notedetail, param),
  deleteNote: param => del(APIMAP.auth.deleteNote, param),
  fileupload: (data, optoins) =>
    post(APIMAP.auth.fileupload, data, {
      headers: {
        'Content-Type': 'image/png'
      }
    }),
  files: param => get(APIMAP.files, param)
};

export default API;
