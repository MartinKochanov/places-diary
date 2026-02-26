import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { login as loginApi, getMe } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = await SecureStore.getItemAsync("token");
            const onboarding = await SecureStore.getItemAsync("hasSeenOnboarding")

            if (storedToken) {
                setToken(storedToken);
                try {
                    const me = await getMe();
                    setUser(me);
                } catch {
                    await SecureStore.deleteItemAsync("token");
                }
            }
            setHasSeenOnboarding(onboarding === "true")
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

    const completeOnboarding = async () => {
        await SecureStore.setItemAsync("hasSeenOnboarding", "true")
        setHasSeenOnboarding(true)
    }

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
                hasSeenOnboarding,
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