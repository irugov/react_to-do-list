import { useState, useEffect } from 'react';

// Кастомный хук для сворачивания/разворачивания списков задач с сохранением состояние с помощью localStorage
function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => {
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