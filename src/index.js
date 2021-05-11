import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:3333/api/";
// axios.defaults.headers.common["Authorization"] =
//   "Bearer " + localStorage.getItem("token");
// export const
//  bearer_token = "Bearer " + localStorage.getItem("token");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
