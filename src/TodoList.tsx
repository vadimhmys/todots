import React, { ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { useState } from 'react';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValuesType) => void,
  addTask: (title: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) return;
    if (e.ctrlKey && e.code === 'Enter') {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
          }
          return (
            <li key={t.id}>
              <input 
                type="checkbox" 
                checked={t.isDone}
                onChange={onChangeHandler}
                />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
