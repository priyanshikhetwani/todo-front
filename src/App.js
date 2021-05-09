import "./App.css";
import React, { useState, useEffect, Component } from "react";
import Header from "./MyComponents/Header";
import { Footer } from "./MyComponents/Footer";
import { Todos } from "./MyComponents/Todos";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import { Login } from "./MyComponents/Login";
import { Register } from "./MyComponents/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

export default class App extends Component {
  state = {
    // loggedIn: false,
    // user: "",
  };

  componentDidMount() {
    axios.get("user").then(
      (res) => {
        console.log("token passed");
        this.setState({
          user: res.data,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // let initTodo;
  // if (localStorage.getItem("todos") === null) {
  //   initTodo = [];
  // } else {
  //   initTodo = JSON.parse(localStorage.getItem("todos"));
  // }
  // const Token = localStorage.getItem("token");

  // const onDelete = (todo) => {
  // console.log("I am onDelete", todo)
  // let index = todos.indexOf(todos);
  // todos.splice(index, 1);
  //   setTodos(
  //     todos.filter((e) => {
  //       return e !== todo;
  //     })
  //   );
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  // const addTodo = (title, desc) => {
  // let sno;
  // console.log("Title and desc", title, desc);
  // if (todos.length === 0) {
  //   sno = 0;
  // } else {
  //   sno = todos[todos.length - 1].sno + 1;
  // }

  // const myTodo = {
  //   sno: sno,
  //   title: title,
  //   id: id,
  //   completed: completed,
  // desc: desc
  //   };
  //   setTodos([...todos, myTodo]);
  // };

  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  // useEffect(() => {}, [setToken]);
  // axios.get("token").then(
  //   (res) => {
  //     token = res.data;
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );

  // Deleting in this way doesn't work in react.
  // let index = todos.indexOf(todo);
  // todos.splice(index, 1);
  render() {
    return (
      <>
        <Router>
          <Header
          // user={this.state.user}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                // if (this.state.user) {
                // console.log(Token);
                return (
                  <>
                    <AddTodo />
                    <Todos />
                  </>
                );
                // } else {
                //   <h1>You are not logged in. </h1>;
                // }
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
            <Route exact path="/logout">
              <Register />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

// export default App;
