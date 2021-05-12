import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

export const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const register = async (email, password, password_confirmation) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {
      email,
      password,
      password_confirmation,
    });
    return res;
  };

  //register
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const res = await register(email, password, password_confirmation);
      localStorage.setItem("email", email);
      localStorage.setItem("token", res.data);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: email,
          token: res.data,
        },
      });
      toast.success("Registered Successfully!");
      history.push("/home");
    } catch (err) {
      toast.error("Invalid Credentials");
      history.push("/register");
    }
  };

  let myStyles = {
    width: "100%",

    alignContent: "center",

    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
    alignItems: "center",
  };
  return (
    <>
      <div className="d-flex  justify-content-center" style={myStyles}>
        <div
          className="w-100 align-items-center m-2"
          style={{ minWidth: "40vw" }}
        >
          <h1>Register</h1>
          <form
            className="col-sm-6 offset-sm-3 text-center center"
            onSubmit={signUp}
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
            <input
              type="password"
              id="password_confirmation"
              className="form-control"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></input>

            <br />
            <button
              class="btn btn-lg btn-dark btn-block"
              type="submit"
              // onClick={(e) => signUp}
            >
              Register
            </button>
          </form>
          <div className="m-1">Already have an account? </div>
          <Link className="clr btn btn-primary" to="/">
            <i>Login</i>
          </Link>
        </div>
      </div>
    </>
  );
};
