import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';

function TaskItem({ id, value, completed }) {
    const {tasks, setTasks} = useContext(TaskContext);

    function handleChecked() {
        setTasks(tasks.map(task => (
            task.id === id ? {...task, completed: !completed} : task
        )))
    }

    return (
        <li className="relative group flex items-center px-[20px]">
            <div className="absolute left-[10px] -translate-x-[50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-move">
                =
            </div>
  
            <div className="grow group-hover:bg-[#363636] group-hover:rounded-md">
                <div className="flex items-center px-[14px]">
                    <input type="checkbox" className="peer appearance-none w-[18px] h-[18px] cursor-pointer border border-[#535358] rounded mr-[5px] hover:bg-[#535358] checked:bg-[#535358] checked:bg-no-repeat checked:bg-center" 
                        checked={completed}
                        onChange={ () => handleChecked(id) }/>
                    <p className="w-full p-[10px] peer-checked:line-through hover:border-none">
                        {value}
                    </p>
                </div>
                <div className="border-t border-[#535358] group-hover:opacity-0"></div> 
            </div> 
  
            <div className="absolute right-[10px] -translate-x-[-50%] opacity-0 group-hover:opacity-100 text-[#535358] hover:text-white hover:cursor-pointer align-middle">
                x
            </div>
        </li>
    );

}

export default TaskItem;
