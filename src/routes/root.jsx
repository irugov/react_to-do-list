import { nanoid } from 'nanoid';
import { TaskProvider  } from '../contexts/TaskContext';
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
      <TaskProvider initialTasks={initialTasks}>
          <TaskList />
      </TaskProvider >
    )
  }
  
  export default Root;
  