import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'REACT', isDone: false },
    { id: 4, title: 'Redux', isDone: false }
  ]);

  function removeTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }
  
  return (
    <div className="App">
      <TodoList 
        title="What to learn" 
        tasks={tasks}
        removeTask={removeTask}/>
    </div>
  );
}

export default App;
