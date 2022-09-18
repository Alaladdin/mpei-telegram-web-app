<template>
    <div class="flex flex-col">
        <div class="self-center mb-5 text-2xl">
            ACTUALITY
        </div>

        <b-accordion
            :items="actualitySections"
            :editable="currentUser.isAdmin"
            @edit-clicked="editActuality"
        />

        <b-sheet
            v-show="showActualitySheet"
            :title="loadedActuality.name"
            @close="closeSheet"
            @closed="clearActualityData"
        >
            <template #additional-title>
                <span>{{ loadedActuality.updatedText }}</span>
                <el-avatar v-if="loadedActuality.avatar" :src="loadedActuality.avatar" :size="32" />
            </template>

            <div v-if="loadedActuality?.data" v-html="loadedActuality?.data" />
            <span v-if="!loadedActuality?.data" class="b-sheet__no-data">
                NO DATA :(
            </span>
        </b-sheet>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus/es';
import { map, omit } from 'lodash';
import { marked } from 'marked';
import moment from 'moment';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import Accordion from '@/components/b-accordion';
import Sheet from '@/components/b-sheet';
import { useActualityStore } from '@/stores/actuality';
import { useAuthStore } from '@/stores/auth';
import type { IActuality } from '@/types/Actuality.interface';

const USER_AVATAR_URL = 'https://res.cloudinary.com/agrabah/image/upload/f_webp,q_100,c_fill,r_max,w_100,h_100/{IMAGE_ID}';

export default defineComponent({
    name      : 'actuality-view',
    components: {
        'b-accordion': Accordion,
        'b-sheet'    : Sheet,
    },
    data: () => ({
        actualityStore    : useActualityStore(),
        loadedActuality   : {} as IActuality,
        showActualitySheet: false,
        isActualityLoading: false,
        isLoading         : false,
    }),
    computed: {
        ...mapState(useAuthStore, {
            currentUser: 'getUser',
        }),
        ...mapState(useActualityStore, {
            sections : 'getSections',
            actuality: 'getActuality',
        }),

        actualitySections() {
            return map(this.sections, (section) => ({
                ...omit(section, ['actualities']),
                children: map(section.actualities, (actuality) => ({
                    ...actuality,
                    disabled: this.isActualityLoading,
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
        editActuality(e) {
            console.log(e);
        },
        openActualityItem(actualityId: string) {
            this.isActualityLoading = true;

            this.loadActuality(actualityId)
                .then((actuality) => {
                    this.loadedActuality = this.prepareActuality(actuality);
                    this.showActualitySheet = true;
                })
                .catch(() => {
                    ElMessage({ message: 'Actuality load error', type: 'error' });
                })
                .finally(() => {
                    this.isActualityLoading = false;
                });
        },
        prepareActuality(actuality: IActuality) {
            const { data, updatedBy, updatedAt } = actuality;
            const updatedAtDate = moment(updatedAt).format('HH:mm DD.MM');
            const updater = updatedBy?.displayName || updatedBy?.username || 'DELETED';

            return {
                ...actuality,
                data       : data && marked.parse(data),
                avatar     : updatedBy?.avatar && USER_AVATAR_URL.replace('{IMAGE_ID}', updatedBy.avatar),
                updatedText: `Updated by ${updater} at ${updatedAtDate}`,
            };
        },
        closeSheet() {
            this.showActualitySheet = false;
        },
        clearActualityData() {
            this.loadedActuality = {};
        },
    },
});
</script>

<style lang='scss'>
@import 'actuality-view';
</style>
