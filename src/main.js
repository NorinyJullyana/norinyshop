import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import router from './router';
import './styles/settings.scss';

import vuetifyConfig from './plugins/vuetify'; 

const app = createApp(App);
const vuetify = createVuetify({
  ...vuetifyConfig,
  components,
  directives,
});

app.use(vuetify);
app.use(router);

app.mount('#app');
