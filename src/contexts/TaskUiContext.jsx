import { createContext, useContext, useState } from 'react';

const TaskUiContext  = createContext();

export function TaskUiProvider({ children }) {
    //Храним в памяти активный таск, на который мы сейчас кликнули
    const [activeTaskId, setActiveTaskId] = useState(null); 

    //Храним в памяти для какого таска сейчас открыто кастомное контекстное меню, чтобы предотвратить открытие нескольких одновременно
    const [openMenuId, setOpenMenuId] = useState(null);

    return (
      <TaskUiContext.Provider value={{ 
        activeTaskId, 
        setActiveTaskId,
        openMenuId,
        setOpenMenuId,
      }}>
        {children}
      </TaskUiContext.Provider>
    );
  }
  
  export const useTaskUiContext = () => useContext(TaskUiContext);
