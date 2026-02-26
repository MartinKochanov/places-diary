import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Onboarding2({ navigation }) {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../../assets/animations/search.json")}
                autoPlay
                loop
                style={styles.animation}
            />

            <Text style={styles.title}>Browse & Favorites</Text>
            <Text style={styles.subtitle}>
                See all your places in one list and mark your favorites for quick access.
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Onboarding3")}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    animation: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#333",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 40,
        color: "#666",
        lineHeight: 22,
    },
    button: {
        backgroundColor: "teal",
        padding: 16,
        borderRadius: 12,
        width: "60%",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
