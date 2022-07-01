<template>
    <el-button circle @click="toggleTheme">
        <fa :icon="isDarkTheme ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" />
    </el-button>
</template>

<script>
import { defineComponent } from 'vue';
import { getFromLocalStorage, setToLocalStorage } from '@/helpers';

export default defineComponent({
    name      : 'b-theme-toggler',
    components: {
    },
    data: () => ({
        isDarkTheme: getFromLocalStorage('isDarkTheme', true),
    }),
    watch: {
        isDarkTheme: {
            immediate: true,
            handler(v) {
                const action = v ? 'add' : 'remove';

                document.documentElement?.classList[action]('dark');
                setToLocalStorage('isDarkTheme', v);
            },
        },
    },
    methods: {
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
        },
    },
});
</script>
