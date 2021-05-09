import React from "react";
import { useDispatch } from "react-redux";
import { toggleCompleteAsync, deleteTodoAsync } from "../redux/todoSlice";

export const TodoItem = ({ title, id, completed }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    dispatch(
      toggleCompleteAsync({
        id: id,
        completed: !completed,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync({ id: id }));
  };

  let myStyle = {
    width: "50%",
    padding: "10px",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFE6",
    minWidth: "70vw",
  };

  return (
    <center>
      <div className="list-group-items m-2" style={myStyle}>
        <div className="d-flex justify-content-between align-items-center">
          <label for="completed" className="checkbox m-1">
            <input
              type="checkbox"
              name="completed"
              checked={completed}
              onChange={handleCompleteClick}
            />
          </label>
          <h5 className="title m-1">{title}</h5>
          {/* <p className="card-text">{todo.desc}</p> */}
          <button
            className="btn btn-close btn-sm m-1"
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
