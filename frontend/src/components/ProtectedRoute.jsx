import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (allowedRoles.includes(userRole)) {
            return children;
        } else {
            return <Navigate to="/error" replace />;
        }
    } catch (error) {
        localStorage.removeItem("jwt");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;