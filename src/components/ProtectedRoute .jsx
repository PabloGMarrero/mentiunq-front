import { useAuth } from "../services/auth-service";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { authed } = useAuth();
  if (!authed) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};