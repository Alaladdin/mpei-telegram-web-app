<template>
    <transition @after-leave="closed">
        <div class="b-sheet">
            <div class="b-sheet__overlay" @click="close" />
            <div v-if="$slots['additional-title']" class="b-sheet__title-additional">
                <slot name="additional-title" />
            </div>
            <div class="b-sheet__container">
                <div class="b-sheet__title">
                    <span class="truncate max-w-7/10">{{ title }}</span>
                    <span class="b-sheet__close-btn click-area" @click="close">
                        <fa icon="close" />
                    </span>
                </div>
                <div class="b-sheet__body">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
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
    emits  : ['close', 'closed'],
    methods: {
        close() {
            this.$emit('close');
        },
        closed() {
            this.$emit('closed');
        },
    },
});
</script>

<style lang='scss'>
@import 'b-sheet';
</style>
