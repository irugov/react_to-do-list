
import { setupWorker } from 'msw/browser'
import { factory, primaryKey, nullable } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { http, HttpResponse, PathParams, DefaultBodyType, delay } from 'msw'
import { Task } from '../components/TaskList/tasksSlice'

type DbTask = Omit<Task, 'date'> & {
    date: string | null;
  };

type ErrorResponse = { content: 'error' };

type TaskUpdate = Partial<Omit<Task, 'id'>> & {
    id?: never;
  };

//Создаем БД
export const db = factory({
    task: {
        id: primaryKey(nanoid),
        value: String,
        date: nullable(String),
        completed: Boolean
    },
})

/*// Имитация задержки сети
const ARTIFICIAL_DELAY_MS = 2000;*/

// Получение данных из localStorage
const getTasksFromLocalStorage = (): void => {
    try {
        const tasksFromStorage: Task[] | null = JSON.parse(localStorage.getItem('ToDo_PetProject_Tasks') || 'null');
        if (tasksFromStorage ) {
            tasksFromStorage.forEach((t: Task) => {
                const taskToCreate = {
                    ...t,
                    date: t.date instanceof Date ? t.date.toISOString() : t.date,
                    completed: t.date instanceof Boolean ? t.completed : false
                }
                db.task.create(taskToCreate);
            })
        }
    } catch (err) {
        console.log(err);
    }
};

getTasksFromLocalStorage();

// Обновление localStorage
const saveTasksToStorage = (tasks: DbTask[]) => {
    localStorage.setItem('ToDo_PetProject_Tasks', JSON.stringify(tasks));
};

export const handlers = [
    http.get('/fakeServer', async () => {
        const tasks = db.task.getAll();
        //await delay(ARTIFICIAL_DELAY_MS);
        return HttpResponse.json(tasks);
    }),
    http.post<PathParams, Task | ErrorResponse>('/fakeServer', async ({ request }) => {
        const data = await request.json();

        const isError = (obj: any): obj is ErrorResponse => {
            return 'content' in obj && obj.content === 'error';
          };

        if(isError(data)) {
            //await delay(ARTIFICIAL_DELAY_MS)

            return new HttpResponse('server save error', {
                status: 500,
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
        }

        const task = db.task.create({
            ...data,
            date: data.date instanceof Date ? data.date.toISOString() : data.date, 
            completed: false}
        );
        saveTasksToStorage(db.task.getAll());

        //await delay(ARTIFICIAL_DELAY_MS)
        return HttpResponse.json(task)
    }),
    http.delete<{taskId: string}>('/fakeServer/:taskId', async ({ params }) => {
        const { taskId } = params;

        if (!taskId) {
            return new HttpResponse('Task ID is required', { status: 400 });
        }
        
        // Имитируем асинхронное удаление
        const deletedTask = db.task.delete({
            where: { id: { equals: taskId } }
        })

        if (!deletedTask) {
            return new HttpResponse('Task not found', { status: 404 });
        }
        
        //await delay(ARTIFICIAL_DELAY_MS);

        saveTasksToStorage(db.task.getAll());
        return HttpResponse.json(deletedTask)
    }),
    http.patch<{taskId: string}, TaskUpdate>('/fakeServer/:taskId', async ({ request, params }) => {
        const { taskId } = params;
        const updates = await request.json();

        const updatedTask = db.task.update({
            where: { id: { equals: taskId } },
            data: {
                ...updates,
                date: updates.date instanceof Date ? updates.date.toISOString() : updates.date
            }
        })

        saveTasksToStorage(db.task.getAll());
        return HttpResponse.json(updatedTask);
    })
    
]

export const worker = setupWorker(...handlers);

worker.listHandlers().forEach((handler) => {
    if ('info' in handler) {
      console.log(handler.info.header);
    }
  });




