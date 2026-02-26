import { TouchableOpacity, Text, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
    const { logout } = useAuth();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: logout },
            ]
        );
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
            <Text style={{ color: "crimson", fontWeight: "600" }}>Logout</Text>
        </TouchableOpacity>
    );
}