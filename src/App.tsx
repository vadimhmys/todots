import React, { useState } from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
};

function App() {
  function removeTask(id: string, todolistId: string) {
    const newTasks = tasksObj[todolistId].filter(t => t.id !== id)
    setTasks({
      ...tasksObj,
      [todolistId]: newTasks
    });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasksObj[todolistId]];
    setTasks({
      ...tasksObj,
      [todolistId]: newTasks
    });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    setTodolists(todolists.map(tl => {
      if (tl.id === todolistId) {
        return {
          ...tl,
          filter: value
        };
      } else {
        return tl;
      }
    }))
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const newTasks = tasksObj[todolistId].map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          isDone,
        };
      } else {
        return t;
      }
    });
    setTasks({
      ...tasksObj,
      [todolistId]: newTasks
    });
  }

  function removeList(todolistId: string) {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    const newTasks = {...tasksObj};
    delete newTasks[todolistId];
    setTasks(newTasks);
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: 'active'},
    {id: todolistId2, title: "What to buy", filter: 'completed'},
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });
  
  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];
        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeList={removeList}
          />
        );
      })}
    </div>
  );
}

export default App;
