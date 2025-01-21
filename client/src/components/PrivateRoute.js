import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../state/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        // Show a loading indicator or nothing while loading
        return <div>Loading...</div>;
    }

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
