import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'virtual:windi.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import '@/assets/global.scss';

library.add(fas);

createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .use(ElementPlus)
    .mount('#app');
