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
            <span>{{ child.name }}</span>
            <fa
                v-if="editable"
                class="text-xs"
                icon="pencil"
                @click.stop="editClicked"
            />
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
        editable: {
            type   : Boolean,
            default: false,
        },
    },
    emits: ['edit-clicked'],
    data : () => ({
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
        editClicked() {
            this.$emit('edit-clicked', this.item);
        },
    },
});
</script>
