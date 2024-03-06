import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('./components/home.vue')
  },
  {
    path: '/cliente-cadastro',
    component: () => import('./components/clienteCadastro.vue'),
  },
  {
    path: '/produto-cadastro',
    component: () => import('./components/produtoCadastro.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
