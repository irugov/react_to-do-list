import { useTaskContext } from '../../contexts/TaskContext';

function TaskItem({ id, value, completed }) {
    const { activeTaskId, setActiveTaskId, setTasks } = useTaskContext();

    function handleChecked() {
        setTasks(prev => prev.map(task => (
            task.id === id ? {...task, completed: !completed} : task
        )))
    }

    return (
        <li className="relative group flex items-center px-[20px]" onClick={ () => setActiveTaskId(id) }>
            <div className="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                =
            </div>
  
            <div className={ id === activeTaskId ? "grow bg-[#282828] rounded-md" : "grow group-hover:bg-[#363636] group-hover:rounded-md" }>
                <div className="flex items-center px-[14px]">
                    <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" 
                        checked={ completed }
                        onChange={ () => handleChecked(id) }/>
                    <p className="w-full p-[10px] peer-checked:line-through hover:border-none">
                        {value}
                    </p>
                </div>
                <div className={ id === activeTaskId ? "" : "border-t border-[#535358] group-hover:opacity-0" }></div> 
            </div> 
  
            <div className="absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle">
                x
            </div>
        </li>
    );

}

export default TaskItem;
