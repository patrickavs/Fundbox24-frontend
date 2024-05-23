import storage from "../lib/storage.ts";
import React, {useState, useEffect} from "react";

export default function useStorage<T>(key: string, initalValue: T) {
    const [value, setValue] = useState<T>(initalValue);

    useEffect(() => {
        storage
            .load({key: key})
            .then(setValue)
            .catch(() => setValue(initalValue));
    }, []);

    useEffect(() => {
        storage.save({key: key, data: value});
    }, [key, value]);

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
