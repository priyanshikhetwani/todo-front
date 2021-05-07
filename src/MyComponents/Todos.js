import React from "react";
import { TodoItem } from "./TodoItem";
import { useSelector } from "react-redux";

export const Todos = (props) => {
  const todos = useSelector((state) => state.todos);

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
              //   todo={todo}
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              //   key={todo.id}
              // onDelete={props.onDelete}
            />
          );
        })
      )}
    </div>
  );
};
