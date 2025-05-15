import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const TaskDataContext  = createContext();

export function TaskDataProvider({ children, initialTasks = [] }) {
   // Формируем стейт из initialTasks / выгружаем из localStorage
    const [tasks, setTasks] = useState(() => { 
      try {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : initialTasks;
      } catch {
        console.error('Ошибка при чтении из localStorage:', error);
        return initialTasks;
      }
    });

    //Сохраняем изменения задач в localStorage
    useEffect(() => {
      try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch {
        console.error('Ошибка при сохранении в localStorage:', error);
      }
    }, [tasks]);

    //Функция для добавления новой задачи
    function addTask(inputValue) {
      const id = nanoid();

      setTasks([...tasks, 
        {id: id, value: inputValue, completed: false}
      ]);

      return id;
    }

    //Функция для изменения состояния задачи (active/completed)
    function toggleTask(id) {
      setTasks(tasks.map(task => (
          task.id === id ? {...task, completed: !task.completed} : task
      )));
    }

    //Функция для изменения текста задачи
    //Функция для удаления задачи
    
    return (
      <TaskDataContext.Provider value={{ 
        tasks,
        addTask,
        toggleTask,/*,
        editTask,
        deleteTask*/
      }}>
        {children}
      </TaskDataContext.Provider>
    );
  }
  
  export const useTaskDataContext = () => useContext(TaskDataContext);
