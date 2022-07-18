<template>
    <button @click="toggleCaret">
        <fa :icon="value ? 'angle-up' : 'angle-down'" />
    </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
    name : 'b-caret',
    props: {
        value: {
            type   : Boolean,
            default: false,
        },
    },
    emits  : ['input'],
    methods: {
        toggleCaret() {
            this.$emit('input', !this.value);
        },
    },
});
</script>
