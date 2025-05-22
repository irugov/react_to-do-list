import { createContext, useContext, useState, useMemo } from 'react';

const TaskUiContext  = createContext();

export function TaskUiProvider({ children }) {
    //Храним в памяти активный таск, на который мы сейчас кликнули
    const [activeTaskId, setActiveTaskId] = useState(null); 

    //Храним в памяти для какого таска сейчас открыто кастомное контекстное меню, чтобы предотвратить открытие нескольких одновременно
    const [openMenuId, setOpenMenuId] = useState(null);

    //Храним в памяти id редактируемого task
    const [isEditingId, setIsEditingId] = useState(null);

    const value = useMemo(() => ({
      activeTaskId, 
      setActiveTaskId,
      openMenuId,
      setOpenMenuId,
      isEditingId,
      setIsEditingId
    }), [activeTaskId, openMenuId, isEditingId]);

    return (
      <TaskUiContext.Provider value={value}>
        {children}
      </TaskUiContext.Provider>
    );
  }
  
  export const useTaskUiContext = () => useContext(TaskUiContext);
