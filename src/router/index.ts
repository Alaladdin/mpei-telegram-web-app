import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path     : '/',
            name     : 'home',
            component: () => import('@/views/HomeView'),
        },
        {
            path     : '/actuality',
            name     : 'actuality',
            component: () => import('@/views/ActualityView'),
        },
        {
            path     : '/:pathMatch(.*)*',
            name     : '404',
            component: () => import('@/views/NotFoundView'),
        },
    ],
});

export default router;
