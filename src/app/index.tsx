import React from "react";
import ReactDOM from "react-dom/client";
import QueryProvider from "./providers/QueryProvider";
import Router from "./providers/RouterProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <Router />
    </QueryProvider>
  </React.StrictMode>,
);
