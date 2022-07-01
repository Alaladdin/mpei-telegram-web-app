import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import 'virtual:windi.css';
// import 'element-plus/theme-chalk/dark/css-vars.css';
// import 'element-plus/dist/index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/jetbrains-mono/400.css';
import '@/assets/global.scss';

createApp(App)
    .use(createPinia())
    .use(router)
    .use(ElementPlus)
    .mount('#app');
