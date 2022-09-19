import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../utils/hooks/useAuth";

export const AuthenticatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return <div>loading...</div>;

  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!loading && user) return <>{children}</>;
};
