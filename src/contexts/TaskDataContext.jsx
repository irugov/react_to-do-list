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
    function addTask(inputValue, date = null) {
      const id = nanoid();

      setTasks([...tasks, 
        {id: id, value: inputValue, completed: false, date: date}
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
    function editTask(id, newValue) {
      setTasks(tasks.map(task => (
        ((task.id === id) && task.value !== newValue && newValue.trim())
        ? {...task, value: newValue}
        : task
      )))
    }

    //Функция для удаления задачи
    function deleteTask(id) {
      if(window.confirm('Подтведить удаление')){
        setTasks(tasks.filter(task => task.id !== id));
      }
    }

    //Функция для изменения даты задачи
    function setNewDate(id, newDate) {
      setTasks(tasks.map(task => (
        ( (task.id === id) && task.date !== newDate )
        ? {...task, date: newDate}
        : task
      )))
    }

    
    return (
      <TaskDataContext.Provider value={{ 
        tasks,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
        setNewDate,
      }}>
        {children}
      </TaskDataContext.Provider>
    );
  }
  
  export const useTaskDataContext = () => useContext(TaskDataContext);
