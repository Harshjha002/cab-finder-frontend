import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("cab_finder_user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const refreshUser = async () => {
        if (user?.id) {
            try {
                const res = await axios.get(`http://localhost:8080/api/user/${user.id}`);
                setUser(res.data);
                localStorage.setItem("cab_finder_user", JSON.stringify(res.data));
            } catch (err) {
                console.error("Failed to refresh user:", err);
            }
        }
    };

    useEffect(() => {
        refreshUser(); // fetch fresh user once on app mount
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("cab_finder_user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("cab_finder_user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
