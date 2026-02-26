import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import OnboardingStack from "./OnboardingStack";

export default function RootNavigator() {
    const { isAuthenticated, hasSeenOnboarding, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {!isAuthenticated ? (
                <AuthStack />
            ) : !hasSeenOnboarding ? (
                <OnboardingStack />
            ) : (
                <MainTabs />
            )}
        </NavigationContainer>
    );
}