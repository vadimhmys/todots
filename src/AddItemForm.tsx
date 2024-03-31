import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export default function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.repeat) return;
    if (e.ctrlKey && e.code === "Enter") {
      props.addItem(title);
      setTitle("");
    }
  };
  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
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
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">Field is required</div>}
    </div>
  );
}
