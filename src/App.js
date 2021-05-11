import "./App.css";
import React, { useState, useEffect, Component } from "react";
import Header from "./MyComponents/Header";
import { Footer } from "./MyComponents/Footer";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import { Login } from "./MyComponents/Login";
// import {Logout} from "./MyComponents/Logout"
import { Register } from "./MyComponents/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import axios from "axios";

export default class App extends Component {
  state = {
    loggedIn: false,
    // user: "",
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        loggedIn: true,
      });
    }
  }

  logOut() {}

  // componentDidMount() {
  //   axios.get("user").then(
  //     (res) => {
  //       console.log("token passed");
  //       this.setState({
  //         user: res.data,
  //       });
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  render() {
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (this.state.loggedIn) {
                  console.log(this.state.loggedIn);
                  return (
                    <>
                      <AddTodo />
                      <Todos />
                    </>
                  );
                } else {
                  return (
                    <h1
                      style={{
                        minHeight: "85vh",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      You are not logged in.
                    </h1>
                  );
                }
              }}
            ></Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}
