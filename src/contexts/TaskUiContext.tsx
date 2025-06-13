import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// 1. Определяем тип для значения контекста
interface TaskUiContextValue {
  activeTaskId: string | null;
  setActiveTaskId: (id: string | null) => void;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  isEditingId: string | null;
  setIsEditingId: (id: string | null) => void;
}

// 2. Создаем контекст с начальным значением и типом
const TaskUiContext = createContext<TaskUiContextValue | undefined>(undefined);

// 3. Типизируем пропсы провайдера
interface TaskUiProviderProps {
  children: ReactNode;
}

export function TaskUiProvider({ children }: TaskUiProviderProps) {
    //Храним в памяти активный таск, на который мы сейчас кликнули
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null); 

    //Храним в памяти для какого таска сейчас открыто кастомное контекстное меню, чтобы предотвратить открытие нескольких одновременно
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    //Храним в памяти id редактируемого task
    const [isEditingId, setIsEditingId] = useState<string | null>(null);

    // 4. Типизация значения контекста
    const value: TaskUiContextValue = useMemo(() => ({
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
  
  export const useTaskUiContext = (): TaskUiContextValue => {
    const context = useContext(TaskUiContext);
    if (context === undefined) {
      throw new Error('useTaskUiContext must be used within a TaskUiProvider');
    }
    return context;
  }
