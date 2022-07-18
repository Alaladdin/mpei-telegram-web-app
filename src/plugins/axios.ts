import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { App, Plugin } from 'vue';

type IAxiosError = AxiosError

const handleError = (err: AxiosError): IAxiosError => {
    const res = err.response;

    if (res) throw res?.data || res?.status;

    throw err.request;
};

const $axios = {
    $get: (url: string, config?: AxiosRequestConfig) => axios
        .get(url, config)
        .then((res) => res.data)
        .catch(handleError),

    $post: (url: string, data: object, config?: AxiosRequestConfig) => axios
        .post(url, data, config)
        .then((res) => res.data)
        .catch(handleError),
};

export const axiosPlugin: Plugin = {
    install: (app: App) => {
        app.config.globalProperties.$axios = $axios;

        // @ts-ignore
        window.$axios = $axios;
    },
};
