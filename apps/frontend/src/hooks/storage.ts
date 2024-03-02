import { useState, useEffect } from 'react';

export const useLocalStorageState = <T extends unknown>(
  key: string,
  initialValue: T
) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  console.log('state', { state });

  useEffect(() => {
    let value = state;

    try {
      value = JSON.stringify(state);
    } catch (e) {
      return;
    }

    localStorage.setItem(key, value);
  }, [key, state]);

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      console.log('EVENT', { e });

      if (e.key === key) {
        console.log('event', { e });
        setState(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [state, setState];
};
