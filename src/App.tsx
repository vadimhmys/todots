import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';


export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
};
type TasksStateType = {
  [key: string]: Array<TaskType>
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks({
      ...tasksObj,
      [todolistId]: filteredTasks
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
    let todolist = todolists.find((tl) => tl.id === todolistId);
    setTodolists(
      todolists.map((tl) => {
        if (todolist && tl.id === todolist.id) {
          return {
            ...tl,
            filter: value,
          };
        } else {
          return tl;
        }
      })
    );
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

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]);

  let removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  };

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodolist (title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all" 
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    });
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const newTasks = tasksObj[todolistId].map((t) => {
      if (t.id === id) {
        return {
          ...t,
          title: newTitle,
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
  
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
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
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
