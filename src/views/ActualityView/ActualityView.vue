<template>
    <div class="flex flex-col">
        <div class="self-center mb-5 text-2xl">
            ACTUALITY
        </div>

        <b-accordion :items="formattedSections" />
        <b-sheet
            v-if="loadedActuality"
            :title="loadedActuality.name"
            @close="closeSheet"
        >
            {{ loadedActuality.data }}
        </b-sheet>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus/es';
import { map, omit } from 'lodash';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import Accordion from '@/components/b-accordion';
import Sheet from '@/components/b-sheet';
import { useActualityStore } from '@/stores/actuality';

export default defineComponent({
    name      : 'actuality-view',
    components: {
        'b-accordion': Accordion,
        'b-sheet'    : Sheet,
    },
    data: () => ({
        actualityStore : useActualityStore(),
        loadedActuality: null,
        isLoading      : false,
    }),
    computed: {
        ...mapState(useActualityStore, {
            sections : 'getSections',
            actuality: 'getActuality',
        }),

        formattedSections() {
            return map(this.sections, (section) => ({
                ...omit(section, ['actualities']),
                children: map(section.actualities, (actuality) => ({
                    ...actuality,
                    callback: this.openActualityItem.bind(this, actuality._id),
                })),
            }));
        },
    },
    created() {
        this.init();
    },
    methods: {
        ...mapActions(useActualityStore, ['init', 'loadActuality']),

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
        openActualityItem(actualityId) {
            this.loadActuality(actualityId)
                .then((actuality) => {
                    this.loadedActuality = actuality;
                })
                .catch(() => {
                  ElMessage({ message: 'Actuality load error', type: 'error' });
                });
        },
        closeSheet() {
            this.loadedActuality = null;
        },
    },
});
</script>

<style lang='scss'>
@import 'actuality-view';
</style>
