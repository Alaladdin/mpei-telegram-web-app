import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

// eslint-disable-next-line max-lines-per-function
export default ({ mode }: { mode:string }) => {
    const env = loadEnv(mode, process.cwd());
    const isDev = mode === 'development';

    return defineConfig({
        plugins: [vue(), WindiCSS()],
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            alias     : {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target      : env.VITE_API_ADDRESS,
                    changeOrigin: isDev,
                    secure      : !isDev,
                    headers     : {
                        AuthToken: env.VITE_AUTH_TOKEN || '',
                    },
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    });
};
