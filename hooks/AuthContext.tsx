import React, { createContext, useContext, useState } from "react";

type User = { email: string; password: string } | null;

type AuthContextType = {
  user: User;
  registeredUser: User;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [registeredUser, setRegisteredUser] = useState<User>(null);

  const signup = (email: string, password: string) => {
    setRegisteredUser({ email, password });
    console.log("User signed up:", email);
  };

  const login = (email: string, password: string) => {
    // Prevent logging in when a user is already logged in
    if (user) {
      alert("Please log out first before logging in a new user.");
      return false;
    }

    // Validate credentials
    if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      setUser({ email, password });
      console.log("User logged in:", email);
      return true;
    } else {
      console.log("Invalid login");
      return false;
    }
  };

  const logout = () => {
    console.log("User logged out");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, registeredUser, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
