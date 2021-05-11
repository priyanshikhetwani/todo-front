import React, { useEffect } from "react";
import { TodoItem } from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";

export const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [todos]);

  let todostyles = {
    minHeight: "85vh",
  };
  return (
    <div className="container" style={todostyles}>
      <h3 className="text-center mb-4">Your Todo List</h3>
      {todos.length === 0 ? (
        <h5 className="text-center">No todos to display</h5>
      ) : (
        todos.map((todo) => {
          return (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
            />
          );
        })
      )}
    </div>
  );
};
