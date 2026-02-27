import React, { useState, useEffect } from 'react'; // Added hooks
import { NavigationContainer } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo'; // Added NetInfo
import MainTabs from "./MainTabs";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import OnboardingStack from "./OnboardingStack";
import OfflineScreen from "../screens/offline/OfflineScreen";
export default function RootNavigator() {
    const { isAuthenticated, isOnboarded, isLoading } = useAuth();
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const offline = state.isConnected === false || state.isInternetReachable === false;
            setIsOffline(offline);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (isOffline) {
        return <OfflineScreen />;
    }

    return (
        <NavigationContainer>
            {!isAuthenticated ? (
                <AuthStack />
            ) : !isOnboarded ? (
                <OnboardingStack />
            ) : (
                <MainTabs />
            )}
        </NavigationContainer>
    );
}