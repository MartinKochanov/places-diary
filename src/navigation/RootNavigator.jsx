import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";

export default function RootNavigator() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer >
            {isAuthenticated ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}