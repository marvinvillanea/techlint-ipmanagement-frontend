import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../providers/ProtectedRoute";
import GuestRoute from "../providers/GuestRoute";
import NotFoundPage from "../../sharedPages/NotFoundPage";
import Loading from "../../components/CenteredSpinner/Loading";
// Lazy-loaded pages
const Login = lazy(() => import("../../modules/auth/Login"));
const ModuleController = lazy(() => import("../../modules/moduleController/moduleController"));

export default function AppRoutes() {
  return (
    // Suspense handles all lazy-loaded components
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        {/* <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<GuestRoute />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<LoginPage />} />
        </Route> */}

        <Route  index  element={ <GuestRoute>  <Login />  </GuestRoute>  }  />
        <Route  path="/login"  element={ <GuestRoute>  <Login />  </GuestRoute>  }  />

        {/* Protected route with dynamic params */}
        <Route path="/module/:dynamic" element={<ProtectedRoute><ModuleController /></ProtectedRoute>} />
        <Route path="/module/:dynamic/:action" element={<ProtectedRoute><ModuleController /></ProtectedRoute>} />


        {/* <Route path="/module/:dynamic" element={<ModuleController />} />
        <Route path="/module/:dynamic/:action" element={<ModuleController />} /> */}

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
