import { AuthUser, loginUser, registerUser } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Omit<AuthUser, "id" | "token"> & { password: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      const savedUser = await AsyncStorage.getItem("user");
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    };
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await loginUser(email, password);
    setToken(userData.token);
    setUser(userData);
    await AsyncStorage.setItem("token", userData.token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (userData: Omit<AuthUser, "id" | "token"> & { password: string }) => {
    const newUser = await registerUser(userData);
    setToken(newUser.token);
    setUser(newUser);
    await AsyncStorage.setItem("token", newUser.token);
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext debe usarse dentro de un AuthProvider");
  return context;
};