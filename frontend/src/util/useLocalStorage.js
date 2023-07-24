import {useEffect, useState} from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);

        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue;
        // return localStorageValue !== null ? localStorageValue : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        // localStorage.setItem(key, value)
    }, [key, value]);

    return [value, setValue];
}


export {useLocalState}