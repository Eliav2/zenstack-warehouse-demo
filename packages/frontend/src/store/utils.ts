import { AtomEffect } from 'recoil';

export const localStorageEffect = <T>(key: string, version: string) =>
  (({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      const savedValueParsed = JSON.parse(savedValue);
      const { val, version: saved_version } = savedValueParsed;
      if (saved_version === version) {
        setSelf(JSON.parse(val));
      } else {
        localStorage.removeItem(key);
        console.log('Local storage version mismatch, clearing local storage');
      }
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify({ val: JSON.stringify(newValue), version }));
    });
  }) as AtomEffect<T>;
