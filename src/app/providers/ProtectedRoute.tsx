import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { JSX } from "react";
import Loading from "../../components/CenteredSpinner/Loading";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }:Props) {

  const { user, loading } = useAuth();

  if (loading) return <Loading/>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

