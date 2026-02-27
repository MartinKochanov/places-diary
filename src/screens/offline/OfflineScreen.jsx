import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OfflineScreen() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="wifi-off" size={100} color="#ccc" />
            <Text style={styles.title}>No Connection</Text>
            <Text style={styles.message}>
                Place Diary needs an active internet connection to sync your memories.
                Please check your settings and try again.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#333',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24,
    },
});