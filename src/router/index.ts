import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes : [
        {
            path     : '/',
            name     : 'home',
            component: () => import('@/views/HomeView.vue'),
        },
        {
            path     : '/actuality',
            name     : 'actuality',
            component: () => import('@/views/ActualityView.vue'),
        },
        {
            path     : '/bars',
            name     : 'bars',
            component: () => import('@/views/BarsView.vue'),
        },
        {
            path     : '/:pathMatch(.*)*',
            name     : '404',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
});

export default router;
