import { Navigate, useLocation } from "react-router-dom";
import  useAuth  from "../hooks/useAuth.js";

export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated() ? children : <Navigate to="/login" state={{ from: location }} />;
  };

export const AdminRoute = ({ children }) => {
    const location = useLocation();
    const { isAdmin } = useAuth();

    return isAdmin() ? children : <Navigate to="/login" state={{ from: location }} />;
};
