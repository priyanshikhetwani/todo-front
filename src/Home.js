import React, { useState, useEffect } from "react";
import { AddTodo } from "./MyComponents/AddTodo";
import { useDispatch } from "react-redux";
import Header from "./MyComponents/Header";
import { useHistory } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TodoItem } from "./MyComponents/TodoItem";
import { Footer } from "./MyComponents/Footer";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");
  // const dispatch = useDispatch();

  // Logout
  const logout = async (authtoken) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/logout`,
      {},
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(token)
      .then((res) => {
        if (res.data) {
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          // dispatch({
          //   type: "LOGOUT",
          //   payload: null,
          // });
          toast.success("Logged out successfully");
          history.push("/");
        }
      })
      .catch((err) => {
        toast.error("An error occured");
        console.log(err);
      });
  };

  const list = async (authtoken) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/todo`, {
        headers: {
          Authorization: authtoken,
        },
      });
      return res;
    } catch {
      return console.log("Cannot get the list");
    }
  };

  //Add todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addToList(token, value)
      .then((res) => {
        toast.success("New task added!");
        setValue("");
      })
      .catch((err) => {
        toast.error("Could not create a new task.");
      });
  };

  const addToList = async (authtoken, title) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/todo`,
      { title },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };

  //Delete todo
  const handleDelete = async (id) => {
    console.log("inside handle delete");
    await deleteList(token, id)
      .then((res) => {
        toast.success("Task deleted");
      })
      .catch((err) => {
        toast.error("Couldn't delete task");
      });
  };

  const deleteList = async (authtoken, id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/delete`,
      { id },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };

  let todostyles = {
    minHeight: "100vh",
  };

  useEffect(() => {
    const val = async () => {
      await list(token)
        .then((res) => {
          // console.log(token);
          const vall = res.data;
          const arr = [];
          vall.map((v) => {
            arr.push({
              id: v.id,
              user_id: v.user_id,
              title: v.title,
              is_completed: v.is_completed,
            });
          });
          if (arr) {
            setTodos([...arr]);
          }
        })
        .catch((err) => {
          console.log("list err", err);
        });
    };
    val();
  }, [handleSubmit]);
  useEffect(() => {
    console.log("todo list", todos);
  }, [todos]);

  return (
    <div>
      {token ? (
        <>
          <div style={todostyles}>
            <Header handleLogout={handleLogout} />
            <AddTodo
              handleSubmit={handleSubmit}
              value={value}
              setValue={setValue}
            />
            <TodoItem todos={todos} handleDelete={handleDelete} />
            {/* <Footer /> */}
          </div>
        </>
      ) : (
        <h3 className="text-center mt-5 clr" style={todostyles}>
          You do not have access to this page!{" "}
          <Link to="/">Login to access this page</Link>
        </h3>
      )}
    </div>
  );
};
