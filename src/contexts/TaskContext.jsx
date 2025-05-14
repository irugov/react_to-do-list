import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children, initialTasks = [] }) {
    const [tasks, setTasks] = useState(initialTasks); // Формируем стейт из initialTasks
    const [activeTaskId, setActiveTaskId] = useState(null); //Храним в памяти активный таск, на который мы сейчас кликнули
    
    return (
      <TaskContext.Provider value={{ 
        activeTaskId, 
        setActiveTaskId,
        tasks,
        setTasks
      }}>
        {children}
      </TaskContext.Provider>
    );
  }
  
  export const useTaskContext = () => useContext(TaskContext);
