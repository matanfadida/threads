import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import Provider from "./components/context/provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <Provider>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
);
