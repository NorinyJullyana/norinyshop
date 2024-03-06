import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import router from './router';

createApp(App).use(createRouter({
  history: createWebHashHistory(),
  routes: router.options.routes,
})).mount('#app');
