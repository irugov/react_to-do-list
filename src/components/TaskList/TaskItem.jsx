import { useRef, useEffect, memo } from 'react';
import { useTaskDataContext } from '../../contexts/TaskDataContext';
import { useTaskUiContext } from '../../contexts/TaskUiContext';
import ContextMenu from './ContextMenu';

function TaskItem({ id, value, completed }) {
    const { toggleTask } = useTaskDataContext();
    const { activeTaskId, 
            setActiveTaskId,
            openMenuId,
            setOpenMenuId 
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

    return (
        <li
            className="relative group flex items-center px-[20px]" 
            onClick={ (e) => {setActiveTaskId(id)} }
        >
            <div className="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                =
            </div>
  
            <div className={ id === activeTaskId ? "grow bg-[#282828] rounded-md" : "grow group-hover:bg-[#363636] group-hover:rounded-md" }>
                <div className="flex items-center px-[14px]">
                    <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" 
                        checked={ completed }
                        onChange={ () => toggleTask(id) }
                        />
                    <p className="w-full p-[10px] peer-checked:line-through hover:border-none">
                        {value}
                    </p>
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
                />
            )}
        </li>
    );

}

export default TaskItem;
