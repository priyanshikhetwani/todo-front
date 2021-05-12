import React from "react";

function Header({ handleLogout }) {
  return (
    <div className=" p-4 pl-5">
      <span className="h3 m-5">Todo List</span>

      <span className="h5 float-right m-auto">
        <button onClick={handleLogout} className="btn btn-dark">
          Logout
        </button>
      </span>
    </div>
  );
}

export default Header;
