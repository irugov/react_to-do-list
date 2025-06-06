import { setupWorker } from 'msw/browser'
import { factory, primaryKey, nullable } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { http, HttpResponse, delay } from 'msw'

export const db = factory({
    task: {
        id: primaryKey(nanoid),
        value: String,
        date: nullable(Date),
        completed: () => false,
    },
})

// Имитация задержки сети
const ARTIFICIAL_DELAY_MS = 2000;

// Получение данных из localStorage
const getTasksFromLocalStorage = () => {
    try {
        const tasksFromStorage  = JSON.parse(localStorage.getItem('ToDo_PetProject_Tasks'));
        if (tasksFromStorage ) {
            tasksFromStorage.map(t => {
                db.task.create(t);
            })
        }
    } catch (err) {
        console.log(err);
    }
};

getTasksFromLocalStorage();

// Обновление localStorage
const saveTasksToStorage = (tasks) => {
    localStorage.setItem('ToDo_PetProject_Tasks', JSON.stringify(tasks));
};

export const handlers = [
    http.get('/fakeServer', async () => {
        const tasks = db.task.getAll();
        //await delay(ARTIFICIAL_DELAY_MS);
        return HttpResponse.json(tasks);
    }),
    http.post('/fakeServer', async ({ request }) => {
        const data = await request.json();

        if(data.content === 'error') {
            //await delay(ARTIFICIAL_DELAY_MS)

            return new HttpResponse('server save error', {
                status: 500,
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
        }

        const task = db.task.create(data);
        saveTasksToStorage(db.task.getAll());

        //await delay(ARTIFICIAL_DELAY_MS)
        return HttpResponse.json(task)
    }),
    http.delete('/fakeServer/:taskId', async ({ params }) => {
        const { taskId } = params;
        
        // Имитируем асинхронное удаление
        const deletedTask = db.task.delete({
            where: { id: { equals: taskId } }
        })
        
        //await delay(ARTIFICIAL_DELAY_MS);

        saveTasksToStorage(db.task.getAll());
        return HttpResponse.json(deletedTask)
    }),
    http.patch('/fakeServer/:taskId', async ({ request, params }) => {
        const { taskId } = params;
        const updates = await request.json();

        const updatedTask = db.task.update({
            where: { id: { equals: taskId } },
            data: updates,
        })

        saveTasksToStorage(db.task.getAll());
        return HttpResponse.json(updatedTask);
    })
    
]

export const worker = setupWorker(...handlers);

worker.listHandlers().forEach((handler) => {
	console.log(handler.info.header)
})




