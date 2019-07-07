import asyncComponent from './components/AsyncComponent';

const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('./pages/home'))
  },
  { path: '/my', component: asyncComponent(() => import('./pages/my')) },
  {
    path: '/myposts',
    component: asyncComponent(() => import('./pages/myposts'))
  },
  {
    path: '/note',
    component: asyncComponent(() => import('./pages/note')),
    routes: []
  },
  {
    path: '/editnote',
    component: asyncComponent(() => import('./pages/editnote'))
  },
  {
    path: '/about',
    component: asyncComponent(() => import('./pages/about'))
  },

  {
    path: '/postdetail',
    component: asyncComponent(() => import('./pages/postdetail'))
  },
  {
    path: '/create',
    component: asyncComponent(() => import('./pages/create'))
  },
  { path: '/login', component: asyncComponent(() => import('./pages/login')) },
  {
    path: '/register',
    component: asyncComponent(() => import('./pages/register'))
  },
  {
    path: '/files',
    component: asyncComponent(() => import('./pages/fileupload'))
  }
];

export default routes;
