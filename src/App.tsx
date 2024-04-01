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
    {id: todolistId1, title: "What to learn", filter: 'all'},
    {id: todolistId2, title: "What to buy", filter: 'all'},
  ]);

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

  function addTodolist(newTitle: string) {
    const todolist: TodolistType = {
      id: v1(),
      title: newTitle,
      filter: "all"
    };
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    });
  }

  function changeTaskTitle(taskId: string, todolistId: string, newTitle: string) {
    const newTask = tasksObj[todolistId].map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          title: newTitle
        }
      } else {
        return t;
      }
    })
    setTasks({
      ...tasksObj,
      [todolistId]: newTask
    });
  }

  function changeTodolistTitle(id: string, title: string) {
    setTodolists(todolists.map(tl => {
      if (tl.id === id) {
        return {
          ...tl,
          title
        };
      } else {
        return tl;
      }
    }));
  }
  
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
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
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            filter={tl.filter}
            removeList={removeList}
          />
        );
      })}
    </div>
  );
}

export default App;
