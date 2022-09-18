<template>
    <el-header class="flex justify-between items-center bg-pink-100 dark:bg-dark-600">
        <b-menu-toggler />

        <router-link to="/">
            WINX SYSTEMS
        </router-link>

        <div class="flex justify-center align-center space-x-2">
            <b-theme-toggler />
            <el-avatar v-if="currentUserAvatarUrl" :size="32" :src="currentUserAvatarUrl" />
        </div>
    </el-header>
</template>

<script lang='ts'>
import { mapState } from 'pinia';
import { defineComponent } from 'vue';
import MenuToggler from '@/components/b-menu-toggler.vue';
import ThemeToggler from '@/components/b-theme-toggler.vue';
import { useAuthStore } from '@/stores/auth';

const USER_AVATAR_URL = 'https://res.cloudinary.com/agrabah/image/upload/f_webp,q_100,c_fill,r_max,w_32,h_32/{IMAGE_ID}';

export default defineComponent({
    name      : 'b-header',
    components: {
        'b-menu-toggler' : MenuToggler,
        'b-theme-toggler': ThemeToggler,
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: 'getUser',
        }),

        currentUserAvatarUrl() {
            const { avatar, loggedIn } = this.currentUser;

            if (!loggedIn) return null;

            return USER_AVATAR_URL.replace('{IMAGE_ID}', avatar);
        },
    },
});
</script>
