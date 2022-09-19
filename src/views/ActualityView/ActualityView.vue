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

        <el-dialog
            v-if="currentUser.isAdmin"
            v-model="showEditActualityModal"
            :title="loadedActuality?.name"
            fullscreen
        >
            <el-input
                v-model="loadedActuality.data"
                :autosize="{ minRows: 20, maxRows: 25 }"
                type="textarea"
            />

            <template #footer>
                <div class="fixed bottom-10 flex flex-col space-y-5 w-9/10">
                    <div class="flex justify-between items-center">
                        <span>{{ loadedActuality.updatedText }}</span>
                        <el-avatar
                            v-if="loadedActuality.avatar"
                            :src="loadedActuality.avatar"
                            :size="32"
                        />
                    </div>

                    <el-button @click="setActualityItem">
                        Update
                    </el-button>
                </div>
            </template>
        </el-dialog>

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

            <div v-if="loadedActuality?.formattedData" v-html="loadedActuality?.formattedData" />
            <span v-if="!loadedActuality?.formattedData" class="b-sheet__no-data">
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
        actualityStore        : useActualityStore(),
        loadedActuality       : {} as IActuality,
        showActualitySheet    : false,
        showEditActualityModal: false,
        isActualityLoading    : false,
        isLoading             : false,
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
        ...mapActions(useActualityStore, ['init', 'loadActuality', 'setActuality']),

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
        editActuality(actuality: IActuality) {
            this.loadActualityItem(actuality._id)
                .then(() => {
                    this.showEditActualityModal = true;
                })
                .catch(() => {});
        },
        setActualityItem() {
            this.setActuality(this.loadedActuality)
                .then(() => {
                    this.showEditActualityModal = false;
                })
                .catch((err) => {
                    ElMessage({ message: 'Actuality update error', type: 'error' });
                });
        },
        openActualityItem(actualityId: string) {
            this.loadActualityItem(actualityId)
                .then(() => {
                    this.showActualitySheet = true;
                })
                .catch(() => {});
        },
        loadActualityItem(actualityId: string) {
            return this.loadActuality(actualityId)
                .then((actuality) => {
                    this.loadedActuality = this.prepareActuality(actuality);
                })
                .catch((err) => {
                    ElMessage({ message: 'Actuality load error', type: 'error' });
                    throw err;
                })
                .finally(() => {
                    this.isActualityLoading = false;
                });
        },
        prepareActuality(actuality: IActuality) {
            const { data, updatedBy, updatedAt } = actuality;
            const updatedAtDate = moment(updatedAt).format('DD.MM');
            const updater = updatedBy?.displayName || updatedBy?.username || 'DELETED';

            return {
                ...actuality,
                formattedData: data && marked.parse(data),
                avatar       : updatedBy?.avatar && USER_AVATAR_URL.replace('{IMAGE_ID}', updatedBy.avatar),
                updatedText  : `Updated by ${updater} at ${updatedAtDate}`,
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
