import { nanoid } from 'nanoid';
import { TaskDataProvider  } from '../contexts/TaskDataContext';
import { TaskUiProvider  } from '../contexts/TaskUiContext';
import TaskList from '../components/TaskList/TaskList';

function Root() {
    const initialTasks = [
        {id: nanoid(), value: "тест1", date: new Date(), completed: false}, 
        {id: nanoid(), value: "тест2", date: new Date(Date.now() + 86400000), completed: false}, 
        {id: nanoid(), value: "тест3", date: new Date(Date.now() + 86400000 * 3), completed: true}, 
        {id: nanoid(), value: "тест4", date: new Date('2024-05-25'), completed: true},
        {id: nanoid(), value: "тест4", date: new Date('2024-04-30'), completed: true},
      ];
  
    return (
      <TaskDataProvider initialTasks={initialTasks}>
        <TaskUiProvider>
          <TaskList />
        </TaskUiProvider>
      </TaskDataProvider >
    )
  }
  
  export default Root;
  