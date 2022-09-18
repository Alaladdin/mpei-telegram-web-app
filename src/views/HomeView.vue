<template>
    <div class="flex flex-col justify-center items-center space-y-5">
        <img
            class="rounded"
            src="@/assets/winx.png"
            alt="Winx"
        >
        <div class="flex space-x-3">
            <router-link
                v-for="route in routes"
                v-slot="{ navigate, isActive }"
                :key="route.path"
                :to="route.path"
                custom
            >
                <el-link :type="isActive ? 'warning' : 'info'" @click="navigate">
                    /{{ route.name }}
                </el-link>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import reject from 'lodash/reject';
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from '../router';

export default defineComponent({
    name    : 'home-view',
    computed: {
        ...mapState(useAuthStore, {
            currentUser: 'getUser',
        }),

        routes() {
            const { loggedIn } = this.currentUser;
            const routeNames = ['404'];

            if (loggedIn) routeNames.push('login');

            return reject(router.getRoutes(), (route) => routeNames.includes(route.name));
        },
    },
});
</script>
