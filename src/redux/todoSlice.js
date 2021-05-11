import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
// import 'bearer_token';

const Token = "bearer " + localStorage.getItem("token");

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    console.log(Token);
    // console.log("bearer_token",bearer_token);
    console.log("in thunk");
    const response = await fetch("http://127.0.0.1:3333/api/todo", {
      method: "GET",
      headers: {
        Authorization: Token,
      },
    });
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (payload) => {
    const response = await fetch("http://127.0.0.1:3333/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (response.ok) {
      console.log("posted");
      alert("Added");
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodosAsync",
  async (payload) => {
    console.log(payload);
    console.log("patching update");
    const response = await fetch(
      `http://127.0.0.1:3333/api/todo/${payload.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
        body: JSON.stringify({ completed: payload.completed }),
      }
    );

    if (response.ok) {
      console.log("ok update");
      // console.log(response.json());
      const todo = await response.json();
      console.log(todo);
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodosAsync",
  async (payload) => {
    console.log(payload.id);
    console.log("inside deleteasync");
    const response = await fetch(
      `http://127.0.0.1:3333/api/todo/${payload.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: Token,
        },
        body: JSON.stringify({ id: payload.id }),
      }
    );

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
      <Redirect to="/" />;
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      console.log("fulfilled");
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      console.log(state[index]);
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      // const history = useHistory();
      console.log("delete fulfilled");
      // return action.payload.todos;
      return state.filter((todo) => todo.id !== action.payload.id);
      alert("Successfully Deleted");
      // <Redirect to="/"/>
      // history.push("/")
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
