import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes/AppRoutes";
import { AuthProvider } from "./app/providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);



