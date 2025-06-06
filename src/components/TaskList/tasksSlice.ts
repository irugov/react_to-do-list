import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// 1. Интерфейсы состояний и задач
interface Task {
	id: string;
	value: string;
	date: Date | undefined;
	completed: boolean;
}
  
interface TasksState {
	tasks: Task[];
	status: 'idle' | 'in progress' | 'success' | 'fail',
	error: string | null,
}


const initialState: TasksState = {
	tasks: [],
	status: 'idle',
	error: null,
};

// 2. Типизированные асинхронные thunks
export const fetchTasks = createAsyncThunk<Task[]>(
	'tasks/fetchTasks',
	async () => {
		const response = await client.get('/fakeServer');
		return response.data;
	}
);

export const addTask = createAsyncThunk<Task, Omit<Task, 'id'>>(
	'tasks/addTask',
	async (newTask) => {
		const response = await client.post('/fakeServer', newTask)
		return response.data
	}
);

export const deleteTask = createAsyncThunk<string, string>(
	'tasks/deleteTask',
	async (taskId) => {
		const response = await client.delete(`/fakeServer/${taskId}`);
		return taskId; // Возвращаем ID удалённой задачи
	}
);

export const updateTask = createAsyncThunk<Task, Task>(
	'tasks/updateTask',
	async (updatedTask) => {
	  const response = await client.patch(`/fakeServer/${updatedTask.id}`, updatedTask);
	  return response.data; // Возвращаем обновлённую задачу с сервера
	}
);

// 3. Создание slice с полной типизацией
const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = 'in progress';
			})
			.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
				state.status = 'success';
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = 'fail';
				state.error = action.error.message ?? 'Unknown error';
			})
			.addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
				state.tasks.push(action.payload);
			})
			.addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
				state.tasks = state.tasks.filter(task => task.id !== action.payload);
			} )
			.addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
				const updatedTask = action.payload;
				const existingTaskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
				if (existingTaskIndex !== -1) {
					state.tasks[existingTaskIndex] = updatedTask;
				}
			})
	}
})

export const selectAllTasks = (state:{ tasks: TasksState }) => state.tasks.tasks;
/*export const selectTaskById = (state, taskId) => 
	state.tasks.tasks.find((task) => task.id === taskId);*/
export default tasksSlice.reducer;