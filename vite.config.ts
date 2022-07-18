import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

export default ({ mode }: { mode:string }) => {
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [vue(), WindiCSS()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target      : 'http://localhost:9000',
                    changeOrigin: true,
                    headers     : {
                        AuthToken: env.VITE_AUTH_TOKEN || '',
                    },
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    });
};
