import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loading from "../../components/CenteredSpinner/Loading";


interface Props {
  children: ReactNode;
}

export default function GuestRoute({ children }: Props) {
  const { user, loading } = useAuth();

  // Pareho sa ProtectedRoute, hintayin muna matapos ang loading
  if (loading) return <Loading/>

  // KONTRA NG PROTECTED ROUTE:
  // Kung MAY USER, bawal siya dito. I-redirect sa Home/Dashboard.
  if (user) {
    const defaultModule = import.meta.env.VITE_DEFAULT_MODULE;
    return <Navigate to={`/module/${defaultModule}/`} replace />;
  }

  return children;
}