import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { App, Plugin } from 'vue';
import { getFromLocalStorage } from '@/helpers';

const getRequestConfig = (config?: AxiosRequestConfig) => ({
    ...(config || {}),
    headers: {
        ...(config?.headers || {}),
        Authorization: getFromLocalStorage('token', null),
    },
});

const handleError = (err: AxiosError): AxiosError => {
    const res = err.response;

    if (res) throw res?.data || res?.status;

    throw err.request;
};

const $axios = {
    $get: (url: string, config?: AxiosRequestConfig) => axios
        .get(url, getRequestConfig(config))
        .then((res) => res.data)
        .catch(handleError),

    $post: (url: string, data: object, config?: AxiosRequestConfig) => axios
        .post(url, data, getRequestConfig(config))
        .then((res) => res.data)
        .catch(handleError),
};

export const axiosPlugin: Plugin = {
    install: (app: App) => {
        app.config.globalProperties.$axios = $axios;

        window.$axios = $axios;
    },
};
