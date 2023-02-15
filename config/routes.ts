const routes = [
  {
    path: '/',
    redirect: '/note',
    layout: false,
  },
  {
    name: '学习',
    path: '/note',
    component: './Note',
    layout: false,
  },
  {
    name: 'dva',
    path: '/dvaLearn',
    component: './DvaLearn',
    layout: false,
  },
  {
    name: 'fiber',
    path: '/fiberLearn',
    component: './Fiber/App',
    layout: false,
  },
  {
    name: 'valtio',
    path: '/valtioLearn',
    component: './Valtio',
    layout: false,
  },
  {
    name: 'recursion',
    path: '/recursion',
    component: './Recursion',
    layout: false,
  },
  {
    name: 'vue',
    path: '/vue',
    component: './Vue',
    layout: false,
  },
];

export default routes;
