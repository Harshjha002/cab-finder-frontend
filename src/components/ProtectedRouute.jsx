import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const ProtectedRoute = ({ children, requireOwner = false }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Not logged in → redirect to sign-in, remember where we came from
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    if (requireOwner && !user.isOwner) {
        // Logged in but not an owner
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;