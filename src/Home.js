import React, { useState, useEffect, Suspense, lazy } from "react";
import AddTodo from "./MyComponents/AddTodo";
import Header from "./MyComponents/Header";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToList, deleteFromList, getList, logout } from "./actions";

const TodoItem = lazy(() => import("./MyComponents/TodoItem"));
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();
  const token = localStorage.getItem("token");

  // Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(token)
      .then((res) => {
        if (res.data) {
          localStorage.removeItem("email");
          localStorage.removeItem("token");
          toast.success("Logged out successfully");
          history.push("/");
        }
      })
      .catch((err) => {
        toast.error("An error occured");
        console.log(err);
      });
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

  //Delete todo
  const handleDelete = async (id) => {
    console.log("inside handle delete");
    await deleteFromList(token, id)
      .then((res) => {
        alert.show("Deleted");
        // toast.success("Task deleted");
      })
      .catch((err) => {
        toast.error("Couldn't delete task");
      });
  };

  let todostyles = {
    minHeight: "100vh",
  };

  const getTodos = async () => {
    await getList(token)
      .then((res) => {
        const todolist = res.data;
        let newarr = [];
        todolist.map((todo) => {
          newarr = [...newarr, todo];
        });
        setTodos(newarr);
      })
      .catch((error) => {
        console.log("Can't get todos");
      });
  };

  useEffect(() => {
    getTodos();
  }, [handleSubmit]);

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
            <Suspense fallback={<h1>Loading . . . </h1>}>
              <TodoItem todos={todos} handleDelete={handleDelete} />
            </Suspense>
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

export default Home;
