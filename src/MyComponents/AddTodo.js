import React from "react";

const AddTodo = ({ value, setValue, handleSubmit }) => {
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
      <form onSubmit={handleSubmit} className="form-inline">
        <div className="mb-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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

export default AddTodo;
