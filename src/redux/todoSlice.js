import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
