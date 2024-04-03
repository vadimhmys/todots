import { TodolistType } from '../App';
import { v1 } from 'uuid';

type ActionType = {
  type: string
  [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
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