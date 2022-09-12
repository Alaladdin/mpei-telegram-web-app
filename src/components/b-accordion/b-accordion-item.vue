<template>
    <div
        class="b-accordion__item b-accordion__item--parent"
        :class="{ 'disabled': item.disabled || !canToggleCaret }"
        @click="canToggleCaret && toggleCaret()"
    >
        <span>{{ item.name }} ({{ item.children.length }})</span>
        <b-caret :value="isOpened" />
    </div>

    <template v-if="isOpened">
        <div
            v-for="child in item.children"
            :key="child._id"
            class="b-accordion__item b-accordion__item--children"
            :class="{ 'disabled': child.disabled }"
            @click="child.callback"
        >
            {{ child.name }}
        </div>
    </template>
</template>

<script>
import { defineComponent } from 'vue';
import Caret from '../b-caret.vue';

export default defineComponent({
    name      : 'b-accordion-item',
    components: {
        'b-caret': Caret,
    },
    props: {
        item: {
            type   : Object,
            default: () => ({}),
        },
    },
    data: () => ({
        isOpened: false,
    }),
    computed: {
        canToggleCaret() {
            return !!this.item.children.length;
        },
    },
    methods: {
        toggleCaret() {
            this.isOpened = !this.isOpened;
        },
    },
});
</script>
