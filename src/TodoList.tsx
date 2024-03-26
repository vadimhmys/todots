import React, { ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { useState } from 'react';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (value: FilterValuesType, todolistId: string) => void,
  addTask: (title: string, todolistId: string) => void,
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
  filter: FilterValuesType
}

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.repeat) return;
    if (e.ctrlKey && e.code === 'Enter') {
      props.addTask(title, props.id);
      setTitle("");
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim(), props.id);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">Field is required</div>}
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
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
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
