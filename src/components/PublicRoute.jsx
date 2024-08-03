import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user.token) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PublicRoute;
