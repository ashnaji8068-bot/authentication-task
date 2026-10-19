import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    // Wait until authentication check finishes
    if (isLoading) {
        return <p>Checking authentication...</p>;
    }

    // Redirect users who are NOT logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Allow logged-in users to access the page
    return children;
}

export default ProtectedRoute;