import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'REACT', isDone: false },
    { id: 4, title: 'Redux', isDone: false }
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }
  
  return (
    <div className="App">
      <TodoList 
        title="What to learn" 
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        />
    </div>
  );
}

export default App;
