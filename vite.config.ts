import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import ElementPlus from 'unplugin-element-plus/vite';
import { defineConfig } from 'vite';

// import 'element-plus/es/components/message/style/css';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
