import React, { useRef, useState } from "react";
// import { Card, Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";

export const Register = () => {
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  async function signUp(e) {
    e.preventDefault();
    console.log("signup");
    let data = {
      email,
      password,
      password_confirmation: confirmPassword,
    };
    console.warn(data);

    axios
      .post("http://127.0.0.1:3333/api/register", data)
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });

    // let result = await fetch("http://127.0.0.1:3333/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Accept: "application/json",
    //   },
    //   body: JSON.stringify(item),
    // });
    // result = await result.json();
    // console.warn("result", result);
    // localStorage.setItem("user-info", JSON.stringify(result));

    // history.push("/");
  }

  let myStyles = {
    width: "100%",
    // minWidth: "50vw",
    // padding: "10px 20px",
    alignContent: "center",
    // margin: "50px",
    justifyContent: "center",
    minHeight: "85vh",
    textAlign: "center",
    alignItems: "center",
    // width: "70vw",

    // alignContent: "center",
    // margin: "20px 50px",
    // justifyContent: "center",
    // minHeight: "85vh",
    // textAlign: "center",
    // alignItems: "center",
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
        </div>
      </div>

      {/* <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <Form>
                <Form.Group id="email" className="mt-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // ref={emailRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // ref={passwordRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm" className="mt-2">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    // ref={passwordConfirmRef}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Button type="submit" className="w-100 m-2" onClick={signUp}>
                    Register
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 mt-2 text-center">
            Already have an account? Login
          </div>
        </div>
      </Container> */}
    </>
  );
};
