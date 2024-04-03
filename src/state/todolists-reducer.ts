import { FilterValuesType, TodolistType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
};

export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  title: string
};

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string,
  title: string
};

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string,
  filter: FilterValuesType
};

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
  switch(action.type) {
    case 'REMOVE-TODOLIST': {
      const newState = state.filter((tl) => tl.id !== action.id);
      return newState;
    }
    case 'ADD-TODOLIST': {
      const newTodolist: TodolistType = {
        id: v1(),
        title: action.title,
        filter: "all"
      };
      return [...state, newTodolist];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map((tl) => {
        if (tl.id === action.id) {
          return {
            ...tl,
            title: action.title,
          };
        } else {
          return tl;
        }
      })
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find((tl) => tl.id === action.id);
      return state.map((tl) => {
        if (todolist && tl.id === todolist.id) {
          return {
            ...tl,
            filter: action.filter,
          };
        } else {
          return tl;
        }
      })
    }

    default:
      throw new Error("I don't understand this action type");
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title };
};

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};