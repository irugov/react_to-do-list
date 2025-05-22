import { nanoid } from 'nanoid';
import { TaskDataProvider  } from '../contexts/TaskDataContext';
import { TaskUiProvider  } from '../contexts/TaskUiContext';
import TaskList from '../components/TaskList/TaskList';

function Root() {
  
    return (
      <TaskDataProvider>
        <TaskUiProvider>
          <TaskList />
        </TaskUiProvider>
      </TaskDataProvider >
    )
  }
  
  export default Root;
  