import { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import * as api from "../api/tasks";

const TaskDataContext  = createContext();

export function TaskDataProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // начальная загрузка
    useEffect(() => {
      api.fetchTasks()
        .then(setTasks)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, );

    //Функция-обертка для оптимистичного обновления состояния tasks
    async function performTaskMutation({
      optimisticUpdate, // (prevTasks) => newTasks
      serverRequest,     // () => Promise<task | null>
    }) {
      const prevTasksCopy = [...tasks]; // сохранение текущего стейта для отката
      console.log('Before optimistic update:', prevTasksCopy);

      // Оптимистичное обновление
      setTasks(optimisticUpdate(tasks));

      try {
        await serverRequest();
      } catch (e) {
        console.error(e);
        setTasks(prevTasksCopy);
        alert("Ошибка при синхронизации с сервером");
      }
    }

    //Функция для добавления новой задачи
    function addTask(value, date = "") {
      const tempId = nanoid();
      const optimisticTask = { id: tempId, value, date, completed: false };

      performTaskMutation({
        optimisticUpdate: (prev) => [...prev, optimisticTask],
        serverRequest: () => api.addTask(tempId, value, date),
      });

      return tempId;
    }

    //Функция для удаления задачи
    function deleteTask(id) {
      const taskToDelete = tasks.find(t => t.id === id);
      if (!taskToDelete || !window.confirm("Подтвердить удаление")) return;

      performTaskMutation({
        optimisticUpdate: (prev) => prev.filter(t => t.id !== id),
        serverRequest: () => api.deleteTask(id),
      });
    }

    //Функция для обновления задачи
    function updateTask(id, patch) {
      performTaskMutation({
        optimisticUpdate: (prev) =>
          prev.map(t => (t.id === id ? { ...t, ...patch } : t)),
        serverRequest: () => api.updateTask(id, patch),
      });
    }

    //Функция-обетка для изменения состояния задачи (active/completed)
    function toggleTask(id) {
      const task = tasks.find(task => task.id === id);
      if (!task) return;

      const patch = { completed: !task.completed };
      updateTask(id, patch)
    }

    //Функция для изменения текста задачи
    function setTaskValue(id, newValue) {
      if (!newValue || newValue.trim() === '') {
        console.error('Значение задачи не может быть пустым');
      }

      const oldValue = tasks.find(task => task.id === id)?.value;
      if (oldValue === newValue) return;

      const patch = { value: newValue };
      updateTask(id, patch)
    }

    //Функция для изменения даты задачи
    function setTaskDate(id, newDate) {
      const oldDate = tasks.find(task => task.id === id)?.date;
      if (oldDate === newDate) return;

      const patch = { date: newDate };
      updateTask(id, patch)
    }

    
    return (
      <TaskDataContext.Provider value={{ 
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        setTaskValue,
        setTaskDate,
      }}>
        {children}
      </TaskDataContext.Provider>
    );
  }
  
  export const useTaskDataContext = () => useContext(TaskDataContext);
