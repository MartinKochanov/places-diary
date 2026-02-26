import React, { useState, forwardRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PasswordInput = forwardRef(({ error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.outerContainer}>
            <View style={[styles.container, error ? styles.inputError : null]}>
                <TextInput
                    ref={ref}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#999"
                    {...props}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconContainer}
                >
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={22}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    outerContainer: { marginBottom: 12, width: '100%' },
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    input: { flex: 1, padding: 14, fontSize: 16, color: "#333" },
    inputError: { borderColor: "red" },
    iconContainer: { padding: 10 },
    errorText: { color: "red", fontSize: 12, marginTop: 4, marginLeft: 4 },
});

export default PasswordInput;