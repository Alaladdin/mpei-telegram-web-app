import type { AxiosError } from 'axios';
import { pick } from 'lodash';
import { defineStore } from 'pinia';
import type { IActualityState, IActuality, ISection } from '@/types/Actuality.interface';

export const useActualityStore = defineStore({
    id   : 'actuality',
    state: (): IActualityState => ({
        sections : null,
        actuality: null,
    }),
    getters: {
        getSections : (state) => state.sections,
        getActuality: (state) => state.actuality,
    },
    actions: {
        init(): Promise<ISection[] | AxiosError> {
            return window.$axios.$get('/api/getActualitiesSections')
                .then(({ sections }: { sections: ISection[] }) => {
                    this.sections = sections;

                    return sections;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        },
        loadActuality(actualityId: string): Promise<IActuality | AxiosError> {
            return window.$axios.$get('/api/getActuality', { params: { actualityId } })
                .then(({ actuality }: { actuality: IActuality }) => {
                    this.actuality = actuality;

                    return actuality;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        },
        setActuality(actuality: any): Promise<IActuality | AxiosError> {
            const clearActuality = pick(actuality, ['_id', 'sectionId', 'data']);

            return window.$axios.$post('/api/setActuality', { actuality: clearActuality })
                .then((res: any) => {
                    console.log(res);

                    return res;
                })
                .catch((err: AxiosError) => {
                    throw err;
                });
        },
    },
});
