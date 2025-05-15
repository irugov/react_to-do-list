import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const TaskContext = createContext();

export function TaskProvider({ children, initialTasks = [] }) {
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

    //Храним в памяти активный таск, на который мы сейчас кликнули
    const [activeTaskId, setActiveTaskId] = useState(null); 
    //Храним в памяти для какого таска сейчас открыто кастомное контекстное меню
    const [openMenuId, setOpenMenuId] = useState(null);

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


    /*useEffect(() => {
      function handleClickOutside(e) { //обработка клика на пустое место окна, снятие фокуса с задачи
        setActiveTaskId(null);
      }

      window.addEventListener('click', handleClickOutside);

      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    }, []);*/
    
    return (
      <TaskContext.Provider value={{ 
        activeTaskId, 
        setActiveTaskId,
        tasks,
        addTask,
        toggleTask,/*,
        editTask,
        deleteTask*/
        openMenuId,
        setOpenMenuId,
      }}>
        {children}
      </TaskContext.Provider>
    );
  }
  
  export const useTaskContext = () => useContext(TaskContext);
