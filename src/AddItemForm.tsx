import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from "react";
import { IconButton, TextField } from "@mui/material"
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
  addItem: (title: string) => void
};

export default function AddItemForm(props: AddItemFormPropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.repeat) return;
    if (e.ctrlKey && e.code === 'Enter') {
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
      <TextField
        variant="outlined"
        label="Type value"
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addItem} color="primary">
        <ControlPoint/>
      </IconButton>
    </div>
  );
}