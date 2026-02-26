import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const EmptyState = ({ title, message, iconName, onRetry }) => (
    <View style={styles.container}>
        <View style={styles.iconCircle}>
            <Ionicons name={iconName || "map-outline"} size={60} color="#ccc" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {onRetry && (
            <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
                <Text style={styles.retryText}>Refresh Page</Text>
            </TouchableOpacity>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 20,
    },
    retryButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'teal',
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontWeight: '600',
    }
});

export default EmptyState;