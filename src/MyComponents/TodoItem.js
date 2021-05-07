import React from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo } from "../redux/todoSlice";

export const TodoItem = ({ title, id, completed }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(
      toggleComplete({
        id: id,
        completed: !completed,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo({ id: id }));
  };

  let myStyle = {
    width: "50%",
    padding: "10px 20px",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFE6",
  };

  return (
    <center>
      <div className="list-group-items m-2" style={myStyle}>
        <div className="d-flex justify-content-between align-items-center">
          <label for="completed" className="checkbox">
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={handleCompleteClick}
            />
          </label>
          <h5 className="title">{title}</h5>
          {/* <p className="card-text">{todo.desc}</p> */}
          <button
            className="btn btn-close btn-sm"
            onClick={handleDeleteClick}
          ></button>
        </div>
      </div>
    </center>

    // <>
    // {((todo.sno%4)===0)?
    // <div className="row">
    //     <div className="card col-md-3 clearfix" style={myStyle}>
    //     <div className="card-body">
    //     <h5 className="card-title">{todo.title}</h5>
    //      <p className="card-text">{todo.desc}</p>
    //       <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo)}}>Delete</button>
    // </div>
    // </div>
    // <br/>
    // </div>
    //     :
    // <>
    // <span>
    // <div className="card col-md-3 clearfix" style={myStyle}>
    //     <div className="card-body">
    //     <h5 className="card-title">{todo.title}</h5>
    //      <p className="card-text">{todo.desc}</p>
    //       <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo)}}>Delete</button>
    // </div>
    // </div>
    // <br/>
    // </span>
    // </>

    // </>
  );
};

// <div className="mb-3">
/* <h4>{todo.title}</h4>
            <p>{todo.desc}</p>
            <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(todo)}}>Delete</button> */

// </div>
