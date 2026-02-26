import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { login as loginApi, getMe } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = await SecureStore.getItemAsync("token");

            if (storedToken) {
                setToken(storedToken);
                try {
                    const me = await getMe();
                    setUser(me);
                } catch {
                    await SecureStore.deleteItemAsync("token");
                }
            }

            setIsLoading(false);
        };

        restoreSession();
    }, []);

    const login = async (email, password) => {
        const { token } = await loginApi(email, password);

        await SecureStore.setItemAsync("token", token);
        setToken(token);

        const me = await getMe();
        setUser(me);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);