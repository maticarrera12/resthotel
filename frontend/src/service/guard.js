import { Navigate, useLocation } from "react-router-dom";
import  useAuth  from "../hooks/useAuth.js";

export const ProtectedRoute = ({ element: Element }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    return isAuthenticated() ? <Element /> : <Navigate to="/login" state={{ from: location }} />;
};

export const AdminRoute = ({ element: Element }) => {
    const location = useLocation();
    const { isAdmin } = useAuth();

    return isAdmin() ? <Element /> : <Navigate to="/login" state={{ from: location }} />;
};
