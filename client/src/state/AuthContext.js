import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        setLoading(false); // Set loading to false after token check
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
