import React, {useState, useEffect} from 'react';

export default function useStorage<T>(key: string, initalValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    const obj: T = JSON.parse(item) || initalValue;
    return obj;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
