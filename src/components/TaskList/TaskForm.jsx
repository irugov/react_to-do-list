import { useState } from 'react';
import { useTaskDataContext } from '../../contexts/TaskDataContext';
import { useTaskUiContext } from '../../contexts/TaskUiContext';
import DatePicker from 'react-datepicker';

function TaskForm() {
    const { addTask } = useTaskDataContext();
    const { setActiveTaskId } = useTaskUiContext();

    const [inputValue, setInputValue] = useState('');
    const [date, setDate] = useState(null);
    const [dateIsEditing, setDateIsEditing] = useState(false);

    function handleSubmit(e) {
        const id = addTask(inputValue.trim(), date);

        e.target.value = '';
        setInputValue('');
        setDate(null);
        setActiveTaskId(id);
    }

    return ( <div className="group relative">
        <input 
            className="flex flex-none rounded-[6px] bg-neutral-800 w-full px-[12px] py-[7px] mb-[20px] placeholder:text-neutral-600" placeholder="+ Добавить задачу"
            value={ inputValue }
            onChange={ (e) => setInputValue(e.target.value) }
            onKeyDown={ (e) => {e.key === "Enter" && handleSubmit(e)} }    
        />
        {!dateIsEditing ? (
            <div 
                className='flex items-center justify-center opacity-0 w-[20px] h-[20px] absolute right-0 top-2 -translate-x-[50%] group-focus-within:opacity-100 group-focus-within:cursor-pointer group-focus-within:hover:bg-[#4d4d4d] group-focus-within:hover:rounded' 
                onClick={() => setDateIsEditing(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="16px" height="16px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" className="mx-auto my-auto">
                    <g>
                        <path fill="#808080" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4   C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z    M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31   c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z    M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8   c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"/>
                    </g>
                </svg>
            </div>
        ) : (
            <div className="absolute top-0 right-0 z-50">
                <DatePicker
                    selected={date || new Date()}
                    onChange={(newDate) => setDate(newDate)}
                    onClickOutside={() => { setDateIsEditing(false); }}
                    inline
                />
            </div>
        )}
        
    </div>
    );
}


export default TaskForm;