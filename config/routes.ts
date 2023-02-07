const routes = [
  {
    path: '/',
    redirect: '/note',
  },
  {
    name: '学习',
    path: '/note',
    component: './Note',
  },
  {
    name: 'dva',
    path: '/dvaLearn',
    component: './DvaLearn',
  },
  {
    name: 'fiber',
    path: '/fiberLearn',
    component: './Fiber/App',
  },
  {
    name: 'valtio',
    path: '/valtioLearn',
    component: './Valtio',
  },
];

export default routes;
