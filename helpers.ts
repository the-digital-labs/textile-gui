import { localStorageKeys } from "./constants";

export function getLocalStorage(): Record<string, any> {
    let storage: Record<string, any> = {};
    Object.values(localStorageKeys).forEach((key: string) => {
        storage[key] = window.localStorage.getItem(key);
    })
    return storage;
};