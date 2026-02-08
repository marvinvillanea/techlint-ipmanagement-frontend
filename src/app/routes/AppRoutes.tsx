import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../providers/ProtectedRoute";
import NotFoundPage from "../../sharedPages/NotFoundPage";
import CenteredSpinner from "../../components/CenteredSpinner/CenteredSpinner";

// Lazy-loaded pages
const Login = lazy(() => import("../../modules/auth/Login"));
const ModuleController = lazy(() => import("../../modules/moduleController/moduleController"));

export default function AppRoutes() {
  return (
    // Suspense handles all lazy-loaded components
    <Suspense fallback={<CenteredSpinner />}>
      <Routes>
        {/* Public routes */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route with dynamic params */}
        {/* <Route path="/module/:dynamic" element={<ProtectedRoute><ModuleController /></ProtectedRoute>} />
        <Route path="/module/:dynamic/:action" element={<ProtectedRoute><ModuleController /></ProtectedRoute>} /> */}


        <Route path="/module/:dynamic" element={<ModuleController />} />
        <Route path="/module/:dynamic/:action" element={<ModuleController />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
