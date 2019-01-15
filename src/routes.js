import asyncComponent from './components/AsyncComponent';

const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('./pages/home'))
  },
  { path: '/my', component: asyncComponent(() => import('./pages/my')) },

  {
    path: '/postdetail',
    component: asyncComponent(() => import('./pages/postdetail'))
  },
  {
    path: '/create',
    component: asyncComponent(() => import('./pages/create'))
  },
  { path: '/login', component: asyncComponent(() => import('./pages/login')) }
];

export default routes;
