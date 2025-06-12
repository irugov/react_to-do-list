import { useState, useEffect } from 'react';

// Кастомный хук для сворачивания/разворачивания списков задач с сохранением состояние с помощью localStorage
function usePersistedState<T>(
  key: string, 
  defaultValue: T
) : [T, (newValue: T | ((prevState: T) => T)) => void] {
    const [state, setState] = useState<T>(() => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    });
  
    // Эффект для сохранения состояния сворачивания/разворачивания списков задач
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState];
  }

export default usePersistedState;