<template>
    <el-header class="flex justify-between items-center bg-pink-100 dark:bg-dark-600">
        <b-menu-toggler />

        <router-link to="/">
            WINX SYSTEMS
        </router-link>

        <b-theme-toggler />
    </el-header>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import MenuToggler from '@/components/b-menu-toggler.vue';
import ThemeToggler from '@/components/b-theme-toggler.vue';

export default defineComponent({
    name      : 'b-header',
    components: {
        'b-menu-toggler' : MenuToggler,
        'b-theme-toggler': ThemeToggler,
    },
});
</script>
