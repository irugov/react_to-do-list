import { useMemo, useRef, useEffect, JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store';
import { selectAllTasks, fetchTasks, Task } from './tasksSlice';
import usePersistedState from '../../hooks/usePersistedState';
import { TaskSection } from './TaskSection';
import { TaskForm } from './TaskForm';

export const TaskList: React.FC = () => {  
  // Получаем все данные из контекста
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = useSelector(selectAllTasks);
  const taskStatus: 'idle' | 'in progress' | 'success' | 'fail' = useSelector((state: RootState) => state.tasks.status);
  const error: string | null = useSelector((state: RootState) => state.tasks.error);

  const dataFetch = useRef<boolean>(false);

  let content: JSX.Element | JSX.Element[] | null = null;;

  // Разделяем задачи на активные и завершенные
  const activeTasks: Task[] = useMemo(() => tasks.filter(task => !task.completed), [tasks]);
  const completedTasks: Task[] = useMemo(() => tasks.filter(task => task.completed), [tasks]);
  
  //Тип для состояния видимости секции
  type SectionsVisibility = {
    active: boolean,
    completed: boolean
  }

  //Типизированное использование кастомного хука:
  const [sectionsVisibility, setSectionsVisibility] = usePersistedState<SectionsVisibility>(
    'sectionsVisibility', 
    {
      active: false,
      completed: true
    }
  );

  //Типизированная функция для переключения видимости списков задач
  function toggleVisibility(section: keyof SectionsVisibility) {
    setSectionsVisibility((prev: SectionsVisibility) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  //Подгрузка контента
  useEffect(() => {
      if (dataFetch.current) return;
      dataFetch.current = true;
      if(taskStatus === 'idle') {
          dispatch(fetchTasks());
      }
  }, [taskStatus, dispatch]);
  
  if (taskStatus === 'in progress') {
      content = <section className="grow bg-[#1c1c1c]">  <p>Tasks list is loading ...</p> </section>
  } else if (taskStatus === 'success') {
      content = <>
                  <header className="sticky top-0 z-50 px-[20px] py-[15px] bg-[#1c1c1c]">
                    <div className="flex justify-between items-center mb-[20px]">
                          <div className="flex items-center gap-[5px]">
                            <span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 32 32" fill="none">
                                <path stroke="#535358" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8h15M5 16h22M5 24h22M5 11l3-3-3-3"/>
                              </svg>
                            </span>
                            <p className="text-[20px] font-bold">Всe</p>
                          </div>
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="none">
                              <path d="M5.47719 7.96225C5.1802 8.25099 5.17351 8.72582 5.46225 9.02281C5.75099 9.3198 6.22582 9.32649 6.52281 9.03775L5.47719 7.96225ZM9.6 5H10.35C10.35 4.69857 10.1695 4.42644 9.89188 4.30913C9.61422 4.19182 9.29331 4.25214 9.07719 4.46225L9.6 5ZM8.85 19C8.85 19.4142 9.18579 19.75 9.6 19.75C10.0142 19.75 10.35 19.4142 10.35 19H8.85ZM18.5228 16.0377C18.8198 15.749 18.8265 15.2742 18.5377 14.9772C18.249 14.6802 17.7742 14.6735 17.4772 14.9623L18.5228 16.0377ZM14.4 19H13.65C13.65 19.3014 13.8305 19.5736 14.1081 19.6909C14.3858 19.8082 14.7067 19.7479 14.9228 19.5377L14.4 19ZM15.15 5C15.15 4.58579 14.8142 4.25 14.4 4.25C13.9858 4.25 13.65 4.58579 13.65 5H15.15ZM6.52281 9.03775L10.1228 5.53775L9.07719 4.46225L5.47719 7.96225L6.52281 9.03775ZM8.85 5V19H10.35V5H8.85ZM17.4772 14.9623L13.8772 18.4623L14.9228 19.5377L18.5228 16.0377L17.4772 14.9623ZM15.15 19V5H13.65V19H15.15Z" fill="#535358"/>
                            </svg>
                          </div>
                    </div>
                  
                    <TaskForm /> 
                  </header>

                  <section className="grow bg-[#1c1c1c]">  
                    <TaskSection 
                      toggleVisibility={() => toggleVisibility('active')}
                      sectionsVisibility={sectionsVisibility.active}
                      title="Активно"
                      tasks={activeTasks}
                    />
                      
                    <TaskSection 
                      toggleVisibility={() => toggleVisibility('completed')}
                      sectionsVisibility={sectionsVisibility.completed}
                      title="Выполнено"
                      tasks={completedTasks}
                    />
                  </section>
      </>
  } else if (taskStatus === 'fail') {
      content = <div>{error}</div>
  }

  return (
    <main className="flex flex-col h-screen text-white">
      { content }
    </main>
  );

};

