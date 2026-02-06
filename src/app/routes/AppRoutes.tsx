import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../providers/ProtectedRoute";

const Login = lazy(() => import("../../modules/auth/pages/Login"));
const Dashboard = lazy(() => import("../../modules/auth/pages/Dashboard"));

export default function AppRoutes() {

   
  return (
    <Suspense fallback={<div className="spinner-border text-primary preload-spinner"></div>}>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
