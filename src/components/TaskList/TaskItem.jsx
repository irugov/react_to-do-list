import { useState, useRef, useEffect } from 'react';
import { useTaskDataContext } from '../../contexts/TaskDataContext';
import { useTaskUiContext } from '../../contexts/TaskUiContext';
import ContextMenu from './ContextMenu';

function TaskItem({ id, value, completed }) {
    const [inputValue, setInputValue] = useState(value);
    const editInputRef = useRef(null);
    
    const { toggleTask, editTask } = useTaskDataContext(); //отметка задачи выполненной/активной
    const { activeTaskId, 
            setActiveTaskId,
            openMenuId,
            setOpenMenuId,
            isEditingId,
            setIsEditingId
        } = useTaskUiContext();

    const menuRef = useRef(null); // Ссылка на DOM-элемент меню, для предотвращения нескольких открытых одновременно меню для разных задач

    // Закрытие меню при клике вне его области
    useEffect(() => {
        function handleClickOutside(e) {
            if(menuRef.current && !menuRef.current.contains(e.target)) {   
                setOpenMenuId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    //Функция-обработчик клика на таск
    function handleTaskOnClick(id) {
        setActiveTaskId(id); 
        setIsEditingId(id);
    }

    //Функция-обработчик отредактированного значения таска
    function handleEditTask(id, newValue) {
        if (!newValue.trim() || newValue === value) {
            setInputValue(value);
        } else {
            editTask(id, newValue);
        }

        setIsEditingId(null);
    }
    

    return (
        <li
            id={id}
            className="relative group flex items-center px-[20px] min-w-0 w-full" 
            onClick={ () => handleTaskOnClick(id) }
        >
            <div className="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                =
            </div>
  
            <div className={`
                ${id === activeTaskId ? "bg-[#282828] rounded-md" : "group-hover:bg-[#363636] group-hover:rounded-md" }
                grow min-w-0 overflow-hidden
            `}>
                
                <div className="flex items-center px-[14px] min-w-0">
                    <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" 
                        checked={ completed }
                        onChange={ () => toggleTask(id) }
                        />
                    
                    <div className="p-[10px] hover:border-none min-w-0 flex-1 overflow-hidden">
                        {isEditingId && (isEditingId === id) ? (
                            <input
                                ref={editInputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={(e) => handleEditTask(id, e.target.value)}
                                onKeyDown={ (e) => {e.key === "Enter" && editInputRef.current.blur()} }
                                autoFocus
                               className="focus:outline-0 w-full min-w-0"
                            />
                        ) : (
                            <p className="peer-checked:line-through truncate min-w-0">
                                { value }
                            </p>
                        )}
                    </div>
                    
                </div>
                <div className={ id === activeTaskId ? "borderline" : "borderline border-t border-[#535358] group-hover:opacity-0" }></div> 
            </div> 
  
            <div className="absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle"
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
                />
            )}
        </li>
    );

}

export default TaskItem;
