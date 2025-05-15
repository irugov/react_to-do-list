import { useState } from 'react';
import { useTaskDataContext } from '../../contexts/TaskDataContext';
import { useTaskUiContext } from '../../contexts/TaskUiContext';

function TaskForm() {
    const { addTask } = useTaskDataContext();
    const { setActiveTaskId } = useTaskUiContext();

    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e) {
        const id = addTask(inputValue.trim())

        e.target.value = '';
        setInputValue('');
        setActiveTaskId(id);
    }

    return (
        <input 
            className="flex flex-none rounded-[6px] bg-neutral-800 w-full px-[12px] py-[7px] mb-[20px] placeholder:text-neutral-600" placeholder="+ Добавить задачу"
            value={ inputValue }
            onChange={ (e) => setInputValue(e.target.value) }
            onKeyDown={ (e) => {e.key === "Enter" && handleSubmit(e)} }    
        />
    );
}


export default TaskForm;