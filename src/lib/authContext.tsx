import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('login') && !!localStorage.getItem('password'));

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
    {children}
    </AuthContext.Provider>
);
};

export { AuthContext, AuthProvider };
