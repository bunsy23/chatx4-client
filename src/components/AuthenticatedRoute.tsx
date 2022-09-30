import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { AppDispatch } from "../store";
import { fetchConversationsThunk } from "../store/conversationSlice";
import { useAuth } from "../utils/hooks/useAuth";

export const AuthenticatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  } else {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
      return <div>{children}</div>;
    }
  }
};
