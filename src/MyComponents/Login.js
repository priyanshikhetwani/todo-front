import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
        localStorage.setItem("token", res.data.token);
        console.log(res);
      })
      .catch((err) => {
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
  return (
    <div className="d-flex  justify-content-center" style={myStyles}>
      <div className="w-100 m-2" style={{ minWidth: "40vw" }}>
        {/* <div className="text-center justify-content-center" style={myStyles}> */}
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

    //      <div className="form-signin">
    //   <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
    //   <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
    //   <label for="inputEmail" className="sr-only">Email address</label>
    //   <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
    //   <label for="inputPassword" className="sr-only">Password</label>
    //   <input type="password" id="inputPassword" className="form-control" placeholder="Password" required>
    //   <div className="checkbox mb-3">
    //     <label>
    //       <input type="checkbox" value="remember-me"/> Remember me
    //     </label>
    //   </div>
    //   <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    //   <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    // </div>

    /* <div class="columns">
    <div class="column is-4 is-offset-4">
        <div class="box">
            <h2 class="title has-text-centered">Login</h2>

            <form action="/login" method="POST">



<div class="field">
  <label class="label">Email</label>
  <div class="control">
    <input class="input" type="email" placeholder="Email" value="{{flashMessages.get('email') || ''}}" name="email" required>
  </div>
  
</div>




<div class="field">
  <label class="label">Password</label>
  <div class="control">
    <input class="input" type="password" placeholder="Password" value="{{flashMessages.get('pasword') || ''}}" name="password" required>
  </div>
  
</div>



<div class="control">
    <button type="submit" class="button is-link is-fullwidth">Login</button>
</div>
</form>
</div>

</div>
    </div> */
  );
};
