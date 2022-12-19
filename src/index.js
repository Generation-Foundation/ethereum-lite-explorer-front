import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ScrollTop } from "./components/_index";

const root = ReactDOM.createRoot(document.getElementById("root"));

//console.log = () => {}
//console.error = () => {}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollTop />
      <App />
    </BrowserRouter>
  </Provider>
);
