Вот обновлённое описание с учётом всех изменений:

---

# 📝 React To-Do List

A simple yet functional to-do list application built with **React**, using **Redux** for task state management and **React Context API** for UI state. It offers editable tasks, checkboxes, due dates, and persists data via localStorage and a mock API.

---

## 🚀 Features

* 📋 Add, edit, and delete tasks
* ✅ Mark tasks as completed
* 🗓️ Set and update due dates using a calendar
* 💾 Persistent storage via **MSW + localStorage** (mock API)
* 🎨 Clean and responsive UI with Tailwind CSS
* ⚛️ Built using functional components and React Hooks

---

## 📦 Tech Stack

* [React](https://reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React DatePicker](https://reactdatepicker.com/)
* [MSW (Mock Service Worker)](https://mswjs.io/) + `localStorage` – used to simulate a backend
* Custom `dateHelpers` for formatting and handling dates

---

## 📂 Project Structure

```
src/
├── api/               # API mock setup using MSW (includes client.js and server.js)
├── app/               # Redux configuration (store.js)
├── components/        # React/Redux components (TaskItem, TaskList, taskSlice etc.)
├── context/           # React Context for UI state (TaskUiContext)
├── hooks/             # Custom React hooks (e.g., usePersistedState)
├── routes/            # Application pages (root - main page, about, etc.)
├── utils/             # Utility functions (e.g., dateHelpers)
├── app.jsx            # App router
└── main.jsx           # Entry point
```

---

## 🧠 KEY CONCEPTS

### 🧭 State Management

* **Redux Toolkit** is used to manage task-related state like adding, editing, completing, or deleting tasks.
* **React Context API** (`TaskUiContext`) handles UI-level state such as toggling calendar visibility, input focus, and modal state.

### 📆 Date Support

Tasks can optionally have a due date, shown in a human-friendly format using custom date helpers. Dates can be modified inline with a calendar popup.

### 🔁 Persistence

Tasks persist in `localStorage`, backed by **MSW** to simulate API behavior. This ensures realistic development without a real server.

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/irugov/react_to-do-list.git
cd react_to-do-list
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 🧪 Future Improvements

* Task prioritization
* Filter by date or status
* Drag & drop task ordering
* Authentication and cloud sync

---

Хочешь — могу сгенерировать также README в `markdown`-файле для вставки в GitHub.
