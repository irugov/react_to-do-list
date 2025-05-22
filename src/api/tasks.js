const BASE_URL = "http://localhost:3001/tasks";

//Получаем все задачи из базы
export async function fetchTasks() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(errorData.message || "Ошибка загрузки массива задач");
    return res.json();
}

//Добавить новую задачу
export async function addTask(id, value, date) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value, date, completed: false })
    })
    if (!res.ok) throw new Error(errorData.message || "Ошибка загрузки массива задач");
    return res.json();
}

//Удалить задачу
export async function deleteTask(id) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(errorData.message || "Ошибка загрузки массива задач");
    return res.json();
}

//Обновить задачу
export async function updateTask(id, updates) {
    const res = await fetch(`${BASE_URL}/${id}`, { 
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(errorData.message || "Ошибка загрузки массива задач");
    return res.json();
}

