import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

let myStyles = {
  width: "100%",
  // padding: "10px 20px",
  alignContent: "center",
  // margin: "20px 50px",
  justifyContent: "center",
  minHeight: "85vh",
  textAlign: "center",
  alignItems: "center",
};

export const Login = (e) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();
  // useEffect(() => {
  //   if (localStorage.getItem("user-info")) {
  //     history.push("/");
  //   }
  // }, []);

  async function login(e) {
    e.preventDefault();
    console.log("login");
    // console.log(email, password);
    let data = { email, password };
    console.log(data);
    axios
      .post("login", data)
      .then((res) => {
        // loggedIn = true;
        localStorage.setItem("token", res.data.token);
        history.push("/");
        console.log(res);
      })
      .catch((err) => {
        alert("Can't find your credentials");
        console.log(err);
      });
    // let result = await fetch("http://127.0.0.1:3333/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(item),
    // });
    // result = await result.json();

    //  if (response.ok) {
    //   console.log(result);
    //   return item
    // const todo = await response.json();
    // return { id: todo.id, completed: todo.completed };

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/");
  }

  // if (loggedIn) {
  //   return <Redirect to="/" />;
  // }
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
          <button
            class="btn btn-lg btn-dark btn-block"
            type="submit"
            // onClick={login}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
