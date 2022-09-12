<template>
    <div class="b-sheet">
        <div class="b-sheet__title">
            <span>{{ title }}</span>
            <fa class="absolute right-10" icon="close" @click="closeSheet" />
        </div>

        <slot />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name : 'b-sheet',
    props: {
        title: {
            type   : String,
            default: '',
        },
    },
    emits  : ['close'],
    methods: {
        closeSheet() {
            this.$emit('close');
        },
    },
});
</script>

<style lang='scss'>
@import 'b-sheet';
</style>
