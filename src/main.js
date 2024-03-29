import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/tailwind.css';
import './style.css';
import App from './App.vue';
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router/index.js';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
library.add(fas);
app.component('FontAwesomeIcon', FontAwesomeIcon);
app.mount('#app');
