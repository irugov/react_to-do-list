# 📝 React To-Do List

A simple yet functional to-do list application built with **React**, using **Context API**, **localStorage**, and modern UI practices. Allows users to manage tasks with editable text, checkboxes, and optional due dates.

## 🚀 Features

* 📋 Add, edit, and delete tasks
* ✅ Mark tasks as completed
* 🗓️ Set and update due dates using a calendar
* 💾 Persistent storage via `localStorage`
* 🎨 Clean and responsive UI with Tailwind CSS
* ⚛️ Built using functional components and React Hooks

## 📦 Tech Stack

* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React DatePicker](https://reactdatepicker.com/)
* Custom `dateHelpers` for formatting and handling dates

## 📂 Project Structure

```
src/
├── components/        # UI components (TaskItem, TaskList, etc.)
├── context/           # TaskDataContext & TaskUiContext for global state management
├── hooks/             # Custom React hooks (e.g., usePersistedState)
├── routes/            # App routing configuration (root compontent, about page)
├── utils/             # Utility functions (e.g., dateHelpers)
└── main.jsx           # Entry point
```

## 🧠 KEY CONCEPTS
### 🧭 State Management

All tasks and related state are managed through React Context, enabling a centralized and clean data flow:
- TaskDataContext – Manages task data: adding, deleting, updating tasks, setting dates, and more.
- TaskUiContext – Manages UI-related states: toggling date editing, focus states, calendar visibility, etc.

### 📆 Date Support

Tasks can optionally have a due date, shown in a readable format using helper functions. Dates can be modified via an inline calendar.

### 🔁 Persistence

Tasks are stored in `localStorage`, allowing them to persist across page reloads.

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

## 🧪 Future Improvements

* Task prioritization
* Filter by date or status
* Drag & drop task ordering
* Auth and cloud sync

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
