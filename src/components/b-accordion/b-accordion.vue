<template>
    <div class="b-accordion">
        <b-accordion-item
            v-for="item in items"
            :key="item._id"
            :item="item"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import AccordionItem from './b-accordion-item.vue';

export default defineComponent({
    name      : 'b-accordion',
    components: {
        'b-accordion-item': AccordionItem,
    },
    props: {
        items: {
            type   : Object,
            default: () => ({}),
        },
    },
});
</script>

<style lang='scss'>
@import "b-accordion";
</style>
