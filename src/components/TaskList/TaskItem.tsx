import { useState, useRef, useEffect } from 'react';
import { useTaskUiContext } from '../../contexts/TaskUiContext';
import ContextMenu from './ContextMenu';
import { formatDate, getDateColor } from '../../utils/dateHelpers';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux'
import { updateTask } from './tasksSlice'
import { AppDispatch } from '../../app/store'

interface TaskItemProps {
    id: string,
    value: string,
    completed: boolean,
    date: Date | null
}

export const TaskItem: React.FC<TaskItemProps> = ({ id, value, completed, date }) => {
    const [taskValue, setTaskValue] = useState<string>(value);
    const [taskCompleted, setTaskCompleted] = useState<boolean>(completed);
    const [taskDate, setTaskDate] = useState<Date | null>(date);

    const editInputRef = useRef<HTMLInputElement | null>(null); //ссылка на редактирующийся таск
    const [inputValue, setInputValue] = useState<string>(value); //чтобы taskValue редактировался только при закрытии инпута, не во время печатания

    const menuRef = useRef<HTMLDivElement | null>(null); // ссылка на меню, открытое для конкретного таска

    const [dateIsEditing, setDateIsEditing] = useState<boolean>(false); //Открытие/закрытие меню выбора даты для задачи
    const [tempDate, setTempDate] = useState<Date | null>(null); //чтобы при клике на даты в DatePicker не выпонялось изменение даты сразу, а только после закрытия меню

    const { activeTaskId, 
            setActiveTaskId,
            openMenuId,
            setOpenMenuId,
            isEditingId,
            setIsEditingId
        } = useTaskUiContext(); //управление состоянием UI

    const dispatch: AppDispatch = useDispatch(); 

    // Закрытие меню при клике вне его области
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if(menuRef.current && e.target instanceof Node && !menuRef.current.contains(e.target)) {   
                setOpenMenuId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return (): void => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    //Функция-обработчик клика на таск
    function handleTaskOnClick(id: string): void {
        setActiveTaskId(id); 
        setIsEditingId(id);
    }

    interface TaskUpdates {
        value?: string,
        completed?: boolean,
        date?: Date | null,
    }

    //Функция для обновления таска в базе
    function handleUpdateTask(updates: TaskUpdates): void {
        dispatch(
            updateTask({
                id: id,
                value: updates.value ?? value,
                completed: updates.completed ?? completed,
                date: updates.date ?? date,
            })
        )
    }

    //Функция-обработчик изменения value
    function handleUpdateTaskValue(newValue: string): void {
        if(newValue.trim() && newValue !== taskValue) {
            try {
                setTaskValue(newValue);
                handleUpdateTask({value: newValue});
            } catch (err) {
                console.error(err instanceof Error && err.message);
            }
        }
    }

    //Функция-обработчик изменения date
    function handleUpdateTaskDate(): void {
        if(tempDate && tempDate !== taskDate) {
            try {
                handleUpdateTask({date: tempDate});
                setTaskDate(tempDate);
            } catch (err) {
                console.error(err instanceof Error && err.message);
            }
        }
    }

    //Функция-обработчик изменения completed
    function handleToggleTaskCompleted(): void {
        const newCompleted = !taskCompleted;

        try {
            handleUpdateTask({ completed: newCompleted });
            setTaskCompleted(newCompleted)
        } catch (err) {
            console.error(err instanceof Error && err.message);
        }
    }
    

    return (
        <li
            id={id}
            className="relative group flex items-center px-[20px] min-w-0 w-full" 
        >
            <div className="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                =
            </div>
  
            <div className={`
                ${id === activeTaskId ? "bg-[#282828] rounded-md" : "group-hover:bg-[#363636] group-hover:rounded-md" }
                grow min-w-0 
            `}>
                
                <div className="flex items-center px-[14px] min-w-0">
                    <input type="checkbox" className="appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" 
                        checked={ taskCompleted }
                        onChange={ () => handleToggleTaskCompleted() }
                    />
                    
                    <div className="relative p-[10px] hover:border-none min-w-0 flex-1">
                        <div className="flex justify-between min-w-0 gap-4">
                            <div 
                                className="grow overflow-hidden" 
                                onClick={ () => handleTaskOnClick(id) }
                            >
                                {isEditingId && (isEditingId === id) ? (
                                    <input
                                        ref={editInputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onBlur={(e) => {handleUpdateTaskValue(e.target.value)}}
                                        onKeyDown={ (e) => {((e.key === "Enter" && editInputRef.current)) && editInputRef.current.blur()} }
                                        autoFocus
                                        className="focus:outline-0 w-full min-w-0"
                                    />
                                ) : (
                                    <p className={`${completed && "line-through text-neutral-600"} text-clip min-w-0`}>
                                        { value }
                                    </p>
                                )}
                            </div>
                            <div className='flex items-center whitespace-nowrap'>
                                <div className="relative">
                                    {(taskDate && !dateIsEditing) && (
                                        <span 
                                            className={!completed ? `${getDateColor(taskDate)} cursor-pointer` : 'text-neutral-600'}
                                            onClick={() => !completed && setDateIsEditing(true)}>
                                            {formatDate(taskDate)}
                                        </span> 
                                    )}
                                    {(!taskDate && !completed) && (
                                        <div 
                                            className='flex items-center justify-center w-[20px] h-[20px] cursor-pointer hover:bg-[#4d4d4d] hover:rounded' 
                                            onClick={() => setDateIsEditing(true)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="16px" height="16px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
                                                <g>
                                                    <path fill="#808080" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4   C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z    M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31   c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z    M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8   c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"/>
                                                </g>
                                            </svg>
                                        </div>
                                    )}
                                    {dateIsEditing && (
                                        <div className="absolute top-[-10px] right-0 z-50">
                                            <DatePicker
                                                selected={taskDate}
                                                onChange={(newDate) => setTempDate(newDate)}
                                                onClickOutside={() => { setDateIsEditing(false); handleUpdateTaskDate(); }}
                                                inline
                                            />
                                        </div>
                                    )}
                                </div>
                                
                            </div>    
                        </div>
                        <div className={ id === activeTaskId ? "borderline" : "borderline border-t border-[#535358] group-hover:opacity-0 absolute bottom-0 left-0 right-0 w-auto"}></div>
                    </div>
                    
                </div>
                 
            </div> 
  
            <div className="contextMenuButton absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(id === openMenuId ? null : id);
                }}
                onContextMenu={(e) => e.preventDefault()}
            >
                ...
            </div>

            {id === openMenuId && (
                <ContextMenu 
                    menuRef={menuRef}
                    id={id}
                    handleTaskOnClick={handleTaskOnClick}
                />
            )}
        </li>
    );

}