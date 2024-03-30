import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from "react";

type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void,
  id: string
};


export default function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
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


  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">Field is required</div>}
    </div>
  );
}