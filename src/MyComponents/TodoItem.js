import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export const TodoItem = ({ todos, handleDelete }) => {
  const [userId, setUserId] = useState(0);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const user = async (authtoken, email) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/user`,
      { email },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };

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

  const updatedone = async (authtoken, id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/updatetodo`,
      { id },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };
  const updateundone = async (authtoken, id) => {
    console.log("in update");
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/undoupdate`,
      { id },
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    return res;
  };

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
        toast.error("Sorry! we could not update your action");
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
          .filter((l) => {
            return l.user_id == userId;
          })
          .map((list) => (
            <div key={list.id}>
              <center>
                <div className="list-group-items m-2" style={myStyle}>
                  <div className="d-flex justify-content-between align-items-center">
                    <label for="completed" className="checkbox m-1">
                      {list.is_completed == 0 ? (
                        <button
                          className="btn btn-success btn-sm "
                          onClick={(e) => handleCheckBox(list.id)}
                        >
                          Done
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={(e) => handleCheckBoxundo(list.id)}
                        >
                          UNDO
                        </button>
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
