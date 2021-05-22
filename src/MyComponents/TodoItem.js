import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updatedone, updateundone, user } from "../actions";

const TodoItem = ({ todos, handleDelete }) => {
  const [userId, setUserId] = useState(0);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const value = async () => {
      await user(token, email)
        .then((res) => {
          setUserId(res.data.id);
        })
        .catch((err) => {
          console.log("Cannot get user", err);
        });
    };
    value();
  }, [userId]);

  //marking the task as done
  const handleCheckBox = async (id) => {
    await updatedone(token, id)
      .then((res) => {
        toast.success("Congratulations on completing your task!");
      })
      .catch((err) => {
        toast.error("Sorry! we could not update your action");
      });
  };

  //marking the task as undone
  const handleCheckBoxundo = async (id) => {
    await updateundone(token, id)
      .then((res) => {
        toast.success("Your task has been marked UnDone!");
      })
      .catch((err) => {
        toast.error("Sorry! we could not mark it undone");
      });
  };

  let myStyle = {
    width: "50%",
    padding: "10px",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFE6",
    minWidth: "70vw",
  };

  return (
    <>
      {todos ? (
        todos
          .filter((todo) => {
            return todo.user_id === userId;
          })
          .map((list) => (
            <div key={list.id}>
              <center>
                <div className="list-group-items m-2" style={myStyle}>
                  <div className="d-flex justify-content-between align-items-center round">
                    <label for="completed" className="checkbox m-1">
                      {list.is_completed === 0 ? (
                        <input
                          type="checkbox"
                          checked=""
                          onChange={(e) => handleCheckBox(list.id)}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked="checked"
                          onChange={(e) => handleCheckBoxundo(list.id)}
                        />
                      )}
                    </label>
                    <h5 className="title m-1">{list.title}</h5>
                    <button
                      className="btn btn-close btn-sm m-1"
                      onClick={(e) => handleDelete(list.id)}
                    ></button>
                  </div>
                </div>
              </center>
            </div>
          ))
      ) : (
        <div className="text-center">Your List is empty!</div>
      )}
    </>
  );
};

export default TodoItem;
