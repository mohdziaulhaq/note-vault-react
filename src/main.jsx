import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ContextProvider } from "./store/ContextApi";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ContextProvider>
        <App />
      </ContextProvider>
  </React.StrictMode>
);
