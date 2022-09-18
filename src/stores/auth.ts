import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { setToLocalStorage } from '@/helpers';

export const useAuthStore = defineStore({
    id   : 'auth',
    state: () => ({
        user: {
            username: 'guest',
            scope   : ['guest'],
            loggedIn: false,
        },
        actuality: null,
    }),
    getters: {
        getUser: (state) => {
            const { scope } = state.user;

            return {
                ...state.user,
                isAdmin : (scope.includes('admin') || scope.includes('owner')),
                isOwner : scope.includes('owner'),
                loggedIn: !scope.includes('guest'),
            };
        },
    },
    actions: {
        login(data: any) {
            return window.$axios.$post('/api/auth/login', data)
                .then((res) => {
                    this.user = res.user;
                    setToLocalStorage('token', `Bearer ${res.user.token}`);
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        },
        loadUser() {
            return window.$axios.$get('/api/auth/user')
                .then((res) => {
                    this.user = res.user;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        },
    },
});
