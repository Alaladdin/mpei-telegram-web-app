import type { Nullable } from '@/types/Nullable';

export interface IActualityUpdatedBy {
    name: string;
    username: string;
    displayName: Nullable<string>;
    avatar: Nullable<string>;
    scope: string[];
}

export interface IActuality {
    _id: string;
    name: string;
    data: string;
    updatedAt: string;
    updatedBy: IActualityUpdatedBy;
}

export interface ISection {
    _id: string;
    name: string;
    actualities: Omit<IActuality, 'data'>[];
    updatedAt: string;
}

export interface IActualityState {
    sections: Nullable<ISection[]>;
    actuality: Nullable<IActuality>;
}
