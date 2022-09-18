<template>
    <div class="flex flex-col h-full min-h-screen bg-pink-50 dark:bg-dark-400">
        <b-header class="mb-10" />

        <main class="container mx-auto">
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { defineComponent } from 'vue';
import Header from '@/components/b-header.vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    name      : 'app',
    components: {
        'b-header': Header,
    },
    mounted() {
        this.loadUser();
    },
    methods: {
        ...mapActions(useAuthStore, ['loadUser']),
    },
});
</script>
