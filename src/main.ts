import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { axiosPlugin } from '@/plugins/axios';
import App from './App.vue';
import router from './router';

import 'virtual:windi.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import '@/assets/global.scss';

library.add(fas);

createApp(App)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .use(createPinia())
    .use(ElementPlus)
    .use(axiosPlugin)
    .mount('#app');
