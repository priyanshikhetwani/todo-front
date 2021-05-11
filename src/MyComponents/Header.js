import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export default function Header(props) {
  // let button;
  // if (this.props.user) {
  //   console.log(this.props.user);
  //   button = (
  //     <ul>
  //       <li className="nav-item">
  //         <Link
  //           className="nav-link"
  //           to="/"
  //           onClick={() => localStorage.clear()}
  //         >
  //           Log out
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   button = (
  //     <ul>
  //       <li className="nav-item">
  //         <Link className="nav-link" to="/login">
  //           Login
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link className="nav-link" to="/register">
  //           Register
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // }
  const Token = localStorage.getItem("token");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {/* {button} */}
            {/* 

          <ul className="ml-auto"> */}
            {/* <div className="ml-auto"> */}

            {!Token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    <Redirect to="/" />;
                    alert("logging out");
                  }}
                  to="/"
                >
                  Logout
                </Link>
              </li>
            )}
            {/* </div> */}
          </ul>
          {/* {props.searchBar ?
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>:
                        "No search bar"
                    } */}
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: "Todo List",
};

Header.propTypes = {
  title: PropTypes.string,
};
