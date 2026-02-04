import { Picker } from "@react-native-picker/picker"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useCountries } from "../hooks/useCountries";

export default function CountryPicker({ selectedValue, onValueChange }) {

    const {
        data: countries = [],
        isLoading,
        error,
    } = useCountries();

    if (isLoading) return <ActivityIndicator size="small" />;
    if (error) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Something went wrong while loading countries.</Text>
            </View>
        );
    }

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
        >
            <Picker.Item label="All countries" value="" />
            {countries.map((country) => (
                <Picker.Item key={country} label={country} value={country} />
            ))}
        </Picker>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    picker: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc",
    },
});