<template>
    <main class="flex">
        <router-view />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'app',
});
</script>
