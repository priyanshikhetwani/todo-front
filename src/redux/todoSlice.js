import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    console.log("in thunk");
    const response = await fetch("http://127.0.0.1:3333/todo");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload) => {
    const response = await fetch("http://127.0.0.1:3333/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodosAsync",
  async (payload) => {
    console.log("patching update");
    const response = await fetch(`http://127.0.0.1:3333/todo/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      console.log(response.json());
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

// export const getTodosAsync = createAsyncThunk(
//   "http://127.0.0.1:3333/todo",
//   async (payload) => {
//     const response = await userAPI.JSON;
//     return response.data;
//   }
// );

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodosAsync",
  async (payload) => {
    console.log(payload.id);
    console.log("inside deleteasync");
    const response = await fetch(`http://127.0.0.1:3333/todo/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(null),
    });

    if (response.ok) {
      const todo = await response.json();
      console.log(todo.id);
      return { todo };
    } else {
      alert("You are not logged in");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: 1,
      title: "Todo1",
      completed: false,
    },
    {
      id: 2,
      title: "Todo2",
      completed: false,
    },
    {
      id: 3,
      title: "Todo3",
      completed: true,
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      //   console.log(action);
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },

  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("fetching data");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("fetched data");
      return action.payload.todos;
    },
    [addTodosAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      state[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log("delete fulfilled");
      // return action.payload.todos;
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
