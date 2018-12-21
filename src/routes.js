import asyncComponent from './components/AsyncComponent';

const routes = [
  {
    path: '/',
    exact: true,
    component: asyncComponent(() => import('./pages/home'))
  },
  { path: '/login', component: asyncComponent(() => import('./pages/login')) }
];

export default routes;
