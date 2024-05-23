import React, {useState, useEffect} from 'react';
import storage from '../lib/storage.ts';

export default function useStorage<T>(key: string, initalValue: T) {
  const [value, setValue] = useState<T>(initalValue);

  useEffect(() => {
    storage.load<T>({key}).then(value => {
      if (value !== null) {
        setValue(value);
      }
    });
  }, [key]);

  useEffect(() => {
    storage.save({key, data: value});
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
