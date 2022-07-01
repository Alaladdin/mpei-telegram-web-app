<template>
    <header class="flex justify-between items-center px-5 py-3 mb-5 shadow-md w-full dark:bg-dark-300">
        <div>WINX SYSTEMS</div>
        <b-theme-toggler />
    </header>
</template>

<script>
import { defineComponent } from 'vue';
import ThemeToggler from '@/components/b-theme-toggler.vue';

export default defineComponent({
    name      : 'b-header',
    components: {
        'b-theme-toggler': ThemeToggler,
    },
});
</script>
