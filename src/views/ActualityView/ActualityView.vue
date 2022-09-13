<template>
    <div class="flex flex-col">
        <div class="self-center mb-5 text-2xl">
            ACTUALITY
        </div>

        <b-accordion :items="formattedSections" />

        <b-sheet
            v-show="showActualitySheet"
            :title="loadedActuality?.name"
            @close="closeSheet"
            @closed="clearActualityData"
        >
            <template #additional-title>
                <span>{{ actualityUpdatedByText }}</span>
                <img
                    v-if="actualityUserAvatarUrl"
                    :src="actualityUserAvatarUrl"
                    width="32"
                    height="32"
                >
            </template>

            <template v-if="loadedActuality?.data">
                {{ loadedActuality?.data }}
            </template>
            <span v-if="!loadedActuality?.data" class="b-sheet__no-data">
                NO DATA :(
            </span>
        </b-sheet>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus/es';
import { map, omit } from 'lodash';
import moment from 'moment';
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
        actualityStore    : useActualityStore(),
        loadedActuality   : null,
        showActualitySheet: false,
        isActualityLoading: false,
        isLoading         : false,
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
                    disabled: this.isActualityLoading,
                    callback: this.openActualityItem.bind(this, actuality._id),
                })),
            }));
        },
        actualityUpdatedByText() {
            if (!this.loadedActuality) return '';

            const { updatedBy, updatedAt } = this.loadedActuality;
            const updater = updatedBy?.displayName || updatedBy?.username || 'DELETED';
            const updatedAtDate = moment(updatedAt).format('HH:mm DD.MM');

            return `Updated by ${updater} at ${updatedAtDate}`;
        },
        actualityUserAvatarUrl() {
            const { updatedBy } = this.loadedActuality || {};

            if (updatedBy) {
                const url = 'https://res.cloudinary.com/agrabah/image/upload/f_webp,q_100,c_fill,r_max,w_32,h_32/{IMAGE_ID}';

                return url.replace('{IMAGE_ID}', updatedBy.avatar);
            }

            return '';
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
        openActualityItem(actualityId: string) {
            this.isActualityLoading = true;

            this.loadActuality(actualityId)
                .then((actuality) => {
                    this.loadedActuality = actuality;
                    this.showActualitySheet = true;
                })
                .catch(() => {
                    ElMessage({ message: 'Actuality load error', type: 'error' });
                })
                .finally(() => {
                    this.isActualityLoading = false;
                });
        },
        closeSheet() {
            this.showActualitySheet = false;
        },
        clearActualityData() {
            this.loadedActuality = null;
        },
    },
});
</script>

<style lang='scss'>
@import 'actuality-view';
</style>
