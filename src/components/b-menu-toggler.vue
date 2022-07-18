<template>
    <el-button link @click="toggleMenu">
        <fa :icon="isMenuOpened ? 'fa-bars-staggered' : 'fa-bars'" />
    </el-button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { getFromLocalStorage, setToLocalStorage } from '@/helpers';

export default defineComponent({
    name: 'b-menu-toggler',
    data: () => ({
        isMenuOpened: getFromLocalStorage('isMenuOpened', false),
    }),
    watch: {
        isMenuOpened(v) {
            setToLocalStorage('isMenuOpened', v);
        },
    },
    methods: {
        toggleMenu() {
            this.isMenuOpened = !this.isMenuOpened;
        },
    },
});
</script>
