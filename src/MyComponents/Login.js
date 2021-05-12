import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

let myStyles = {
  width: "100%",

  alignContent: "center",

  justifyContent: "center",
  minHeight: "100vh",
  textAlign: "center",
  alignItems: "center",
};

export const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFn = async (email, password) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/login`, {
      email,
      password,
    });
    return res;
  };

  const login = async (e) => {
    e.preventDefault();
    const val = await loginFn(email, password)
      .then((res) => {
        localStorage.setItem("email", email);
        localStorage.setItem("token", res.data.type + " " + res.data.token);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: res.data.type + " " + res.data.token,
          },
        });
        toast.success("Welcome!");
        history.push("/home");
      })
      .catch((err) => {
        toast.error("Incorrect Username or Password");
        console.log(err);
        history.push("/");
      });
  };

  return (
    <div className="d-flex  justify-content-center" style={myStyles}>
      <div className="w-100 m-2" style={{ minWidth: "40vw" }}>
        <h1>Login</h1>
        <form
          className="col-sm-6 offset-sm-3 text-center center "
          onSubmit={login}
        >
          <input
            type="email"
            id="inputEmail"
            className="form-control "
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            required
            autofocus
          />
          <br />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <br />
          <button class="btn btn-lg btn-dark btn-block" type="submit">
            Log in
          </button>
        </form>
        <div className="m-1">Do not have an account? </div>

        <Link className="clr btn-primary btn m-2" to="/register">
          <i>Register here</i>
        </Link>
      </div>
    </div>
  );
};
