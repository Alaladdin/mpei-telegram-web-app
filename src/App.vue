<template>
    <main class="flex flex-col min-h-screen dark:bg-dark-400">
        <b-header />
        <router-view class="px-5 pb-5" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/b-header.vue';

export default defineComponent({
    name      : 'app',
    components: {
        'b-header': Header,
    },
});
</script>
