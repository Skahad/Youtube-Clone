"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    username: string;
    handle: string;
    avatar: string;
    points: number;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string) => void;
    loginWithGoogle: () => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Check if user is already logged in (using localStorage for persistence in this demo)
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (username: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const registeredUser = users.find((u: any) => u.username === username);

        const newUser: User = {
            username,
            handle: `@${username.toLowerCase()}`,
            avatar: registeredUser?.gender === "Female" ? "F" : "U",
            points: 0,
            email: registeredUser?.email || `${username.toLowerCase()}@example.com`
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/");
    };

    const loginWithGoogle = () => {
        const newUser = {
            username: "Shaikh Ahad",
            handle: "@66debcd09",
            avatar: "/avatar.png", // We'll use a placeholder or the one from the prompt if possible
            points: 0,
            email: "shaikh.ahad@example.com"
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
