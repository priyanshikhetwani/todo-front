import React from "react";

function Header({ handleLogout }) {
  // let styles = {
  //   display: "inline-block",
  //   position: "relative",
  //   right: "0",
  //   justifyContent: "spaceBetween",
  // };
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
