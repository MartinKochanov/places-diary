import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { login as loginApi, getMe } from "../api/authService";
import { updateOnboardingStatus } from "../api/userService";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = await SecureStore.getItemAsync("token");

            if (storedToken) {
                try {
                    api.defaults.headers.Authorization = `Bearer ${storedToken}`;
                    const me = await getMe();

                    setToken(storedToken);
                    setUser(me);
                } catch (e) {
                    console.error("Session restore failed", e);
                    await SecureStore.deleteItemAsync("token");
                }
            }
            setIsLoading(false);
        };

        restoreSession();
    }, []);

    const login = async (email, password) => {
        const { token } = await loginApi(email, password);

        api.defaults.headers.Authorization = `Bearer ${token}`;

        const me = await getMe();

        await SecureStore.setItemAsync("token", token);
        setToken(token);
        setUser(me);
    };

    const completeOnboarding = async () => {
        try {
            await updateOnboardingStatus(true, user.id);

            setUser(prev => ({ ...prev, onboarded: true }));
        } catch (error) {
            console.error("Failed to update onboarding status", error);
        }
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
                isOnboarded: user?.onboarded ?? false,
                completeOnboarding,
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