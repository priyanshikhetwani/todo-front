import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Login } from "./MyComponents/Login";
import { Register } from "./MyComponents/Register";
import { Home } from "./Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = () => {
      if (localStorage.getItem("email") && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        console.log("email in app", email);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: email,
            token: token,
          },
        });
      }
    };
    return () => user();
  }, [dispatch]);
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
}

export default App;
