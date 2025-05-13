import { useState } from 'react';
import { nanoid } from 'nanoid';
import { TaskContext } from '../contexts/TaskContext';
import TaskList from '../components/TaskList/TaskList';

function Root() {
    const [tasks, setTasks] = useState([
        {id: nanoid(), value: "тест1", completed: false}, 
        {id: nanoid(), value: "тест2", completed: false}, 
        {id: nanoid(), value: "тест3", completed: true}, 
        {id: nanoid(), value: "тест4", completed: true},
        {id: nanoid(), value: "тест4", completed: true},
      ]);
  
    return (
      <TaskContext.Provider value={{tasks, setTasks}}>
          <TaskList tasks={tasks} />
      </TaskContext.Provider>
    )
  }
  
  export default Root;
  