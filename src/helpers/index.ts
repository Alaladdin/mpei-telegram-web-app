export const setToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string, defaultValue: any) => {
    const rawSavedValue = localStorage.getItem(key);

    try {
        const savedValue = JSON.parse(rawSavedValue || '');

        return savedValue ?? defaultValue;
    } catch {
        return defaultValue;
    }
};
