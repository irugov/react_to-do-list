import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store';
import { addTask } from './tasksSlice'
import DatePicker from 'react-datepicker';
import { formatDate, getDateColor } from '../../utils/dateHelpers';

export const TaskForm: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [dateIsEditing, setDateIsEditing] = useState<boolean>(false);
    const [requestStatus, setRequestStatus] = useState<'idle' | 'in progress'>('idle');

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = async() => {
        const value = inputValue.trim();
        if(value && requestStatus === 'idle') {
            try {
                setRequestStatus('in progress');
                await dispatch(addTask({ value, date })).unwrap();
                setInputValue('');
                setDate(null);
            } catch (err) {
                console.error('save student error: ', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    return (
        <div className="group relative">
            <input 
                className="flex flex-none rounded-[6px] bg-neutral-800 w-full px-[12px] py-[7px] mb-[20px] placeholder:text-neutral-600" placeholder="+ Добавить задачу"
                value={ inputValue }
                onChange={ (e) => setInputValue(e.target.value) }
                onKeyDown={ (e) => {e.key === "Enter" && handleSubmit()} }    
            />
            {!dateIsEditing ? 
                (   
                    !date ? (
                            <div 
                                className='flex items-center justify-center opacity-0 w-[20px] h-[20px] absolute right-0 top-2 -translate-x-[50%] group-focus-within:opacity-100 group-focus-within:cursor-pointer group-focus-within:hover:bg-[#4d4d4d] group-focus-within:hover:rounded' 
                                onClick={() => setDateIsEditing(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="16px" height="16px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" className="mx-auto my-auto">
                                    <g>
                                        <path fill="#808080" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4   C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z    M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31   c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6   c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5   c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6   c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z    M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8   c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"/>
                                    </g>
                                </svg>
                            </div>
                        ) : (
                            <div className='flex items-center justify-center absolute right-0 top-2 mr-3.5 group-focus-within:opacity-100 group-focus-within:cursor-pointer' >
                                <span 
                                    className={`${getDateColor(date)} cursor-pointer`}
                                    onClick={() => setDateIsEditing(true)}
                                >
                                    {formatDate(date)}
                                </span> 
                            </div>
                        )
                ) : (
                    <div 
                        className="absolute top-0 right-0 z-50 border-black"
                        onBlur={() => { setDateIsEditing(false); }}
                    >
                        <div>
                            <button 
                                className='bg-white hover:cursor-pointer' 
                                onClick={() => {setDate(null); console.log(date)}}
                            >
                                    Удалить
                            </button>
                        </div>
                        <div>
                            <DatePicker
                                selected={date || new Date()}
                                onChange={(newDate) => setDate(newDate)}
                                inline
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
