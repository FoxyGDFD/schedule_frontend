import React from "react";
import ReactDOM from "react-dom/client";
import QueryProvider from "./QueryProvider";
import Router from "./RouterProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Router />
    </QueryProvider>
  </React.StrictMode>,
);
