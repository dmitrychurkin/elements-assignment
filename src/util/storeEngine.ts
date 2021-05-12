export const getStorageData = (key = 'cities') => {
    const data = sessionStorage.getItem(key);
    if (data) {
        try {
            return JSON.parse(data);
        }catch {}
    }
    return null;
};

export const setStorageData = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
