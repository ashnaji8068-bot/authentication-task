import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCurrentUser() {
            const userId = localStorage.getItem("userId");

            if (!userId) {
                setIsLoading(false);
                return;


                
            }

            try {
                const response = await api.get(`/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch current user:", error);
                localStorage.removeItem("userId");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCurrentUser();
    }, []);

    // login 
    async function login(email, password) {
    const response = await api.get("/users");
    const users = response.data;

    const loggedInUser = users.find(
        (user) =>
            user.email?.trim().toLowerCase() ===
                email.trim().toLowerCase() &&
            user.password === password
    );

    if (!loggedInUser) {
        throw new Error("Invalid email or password.");
    }

    localStorage.setItem("userId", loggedInUser.id);
    setUser(loggedInUser);

    return loggedInUser;

    }

async function register(userName, fullName, email, password) {
    const response = await api.get("/users");
    const users = response.data;

    const usernameExists = users.some(
        (user) =>
            user.username?.trim().toLowerCase() ===
            userName.trim().toLowerCase()
    );

    const emailExists = users.some(
        (user) =>
            user.email?.trim().toLowerCase() ===
            email.trim().toLowerCase()
    );

    if (usernameExists) {
        throw new Error(
            "Username already exists. Please choose a different username."
        );
    }

    if (emailExists) {
        throw new Error(
            "Email already exists. Please choose a different email."
        );
    }

    const registerResponse = await api.post("/users", {
        username: userName.trim(),
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        createdAt: new Date().toISOString()
    });

    return registerResponse.data;


    }

  
    function logout() {
        localStorage.removeItem("userId");
        setUser(null);
    }

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                 user,
                 setUser,
                 setIsLoading,
                 isAuthenticated,
                 login,
                 register,
                 logout
                }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}