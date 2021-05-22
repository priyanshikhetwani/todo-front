import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./Home"));
const Register = lazy(() => import("./MyComponents/Register"));
const Login = lazy(() => import("./MyComponents/Login"));

function App() {
  useEffect(() => {
    const user = () => {
      if (localStorage.getItem("email") && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        console.log("email", email);
      }
    };
    return () => user();
  });

  return (
    <>
      {/* <MyErrorBoundary> */}
      <Suspense fallback={<h1>Loading . . . </h1>}>
        <ToastContainer />
        <Switch>
          <Route exact path="/home" component={Home} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Suspense>
      {/* </MyErrorBoundary> */}
    </>
  );
}

export default App;
