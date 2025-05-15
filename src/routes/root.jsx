import { nanoid } from 'nanoid';
import { TaskDataProvider  } from '../contexts/TaskDataContext';
import { TaskUiProvider  } from '../contexts/TaskUiContext';
import TaskList from '../components/TaskList/TaskList';

function Root() {
    const initialTasks = [
        {id: nanoid(), value: "тест1", completed: false}, 
        {id: nanoid(), value: "тест2", completed: false}, 
        {id: nanoid(), value: "тест3", completed: true}, 
        {id: nanoid(), value: "тест4", completed: true},
        {id: nanoid(), value: "тест4", completed: true},
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
  