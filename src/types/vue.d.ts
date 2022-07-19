export {};

declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}

declare module '*.css' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export default classNames;
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export default classNames;
}
