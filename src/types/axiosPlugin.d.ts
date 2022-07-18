import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface IAxiosPlugin {
    $get: (url: string, config?: AxiosRequestConfig) => AxiosResponse;
    $post: (url: string, data: object, config?: AxiosRequestConfig) => AxiosResponse;
}
