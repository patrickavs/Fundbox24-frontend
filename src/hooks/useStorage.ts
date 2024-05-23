import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useStorage<T>(key: string, initalValue: T) {
  const [value, setValue] = useState<T>(initalValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(value => {
      if (value) {
        setValue(JSON.parse(value));
      }
    });
  }, [key]);

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
