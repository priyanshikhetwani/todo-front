import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodosAsync } from "../redux/todoSlice";

export const AddTodo = () => {
  const [title, setTitle] = useState();

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    console.log("dispatched");
    if (!title) {
      alert("Title can not be blank.");
    } else {
      dispatch(
        addTodosAsync({
          title: title,
        })
      );
    }
  };
  const styles = {
    width: "50%",
    minWidth: "80vw",
  };
  const mystyle = {
    backgroundColor: "#FFFFE6",
  };
  return (
    <div className="container mt-3 mb-3" style={styles}>
      <h3 className="text-center">Add Todo's</h3>
      <form onSubmit={submit} className="form-inline">
        <div className="mb-3">
          {/* <label for="formGroupExampleInput" class="form-label">Example label</label> */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            id="title"
            placeholder="Title"
            style={mystyle}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-success btn-sm">Add</button>
        </div>
      </form>
    </div>
  );
};
