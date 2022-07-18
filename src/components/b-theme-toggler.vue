<template>
    <el-button link @click="toggleTheme">
        <fa :icon="isDarkTheme ? 'fa-moon' : 'fa-sun'" />
    </el-button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { getFromLocalStorage, setToLocalStorage } from '@/helpers';

export default defineComponent({
    name: 'b-theme-toggler',
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
