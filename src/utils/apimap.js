const APIMAP = {
  login: '/api/user/login',
  register: '/api/user/register',
  posts: '/api/posts',
  postdetail: '/api/posts/detail',
  notes: '/api/notes',
  notedetail: '/api/notes/detail',
  findUserByname: '/api/user/find',
  auth: {
    post: '/api/post',
    user: '/api/user',
    myPosts: '/api/user/posts',
    logout: '/api/user/logout',
    avatar: '/api/user/avatar',
    userfile: '/api/user/file',
    create: '/api/post/create',
    updatePost: '/api/post/update',
    deletePost: '/api/post/delete',
    createNote: '/api/note/create',
    updateNote: '/api/note/update',
    deleteNote: '/api/note/delete'
  }
};
export default APIMAP;
