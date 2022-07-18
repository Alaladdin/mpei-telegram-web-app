<template>
    <div class="flex flex-col">
        <div class="self-center mb-5 text-2xl">
            ACTUALITY
        </div>

        <b-accordion :items="formattedSections" />
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus/es';
import { map, omit } from 'lodash';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import Accordion from '@/components/b-accordion';
import { useActualityStore } from '@/stores/actuality';

export default defineComponent({
    name      : 'actuality-view',
    components: {
        'b-accordion': Accordion,
    },
    data: () => ({
        actualityStore: useActualityStore(),
        isLoading     : false,
    }),
    computed: {
        ...mapState(useActualityStore, {
            sections : 'getSections',
            actuality: 'getActuality',
        }),

        formattedSections() {
            return map(this.sections, (section) => ({
                ...omit(section, ['actualities']),
                children: section.actualities,
            }));
        },
    },
    created() {
        this.init();
    },
    methods: {
        ...mapActions(useActualityStore, ['init']),

        initPage() {
            this.isLoading = true;

            this.init()
                .catch(() => {
                    ElMessage({ message: 'Init error', type: 'error' });
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
});
</script>

<style lang='scss'>
@import 'actuality-view';
</style>
