import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export {};

interface IAxiosPlugin {
    $get: (url: string, config?: AxiosRequestConfig) => AxiosResponse;
    $post: (url: string, data: object, config?: AxiosRequestConfig) => AxiosResponse;
}
