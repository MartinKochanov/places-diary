import { Picker } from "@react-native-picker/picker"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useCountries } from "../hooks/places/useCountries";

export default function CountryPicker({ selectedValue, onValueChange }) {

    const {
        data: countries = [],
        isLoading,
        error,
        refetch,
    } = useCountries();

    if (isLoading) return <ActivityIndicator size="small" />;
    if (error) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Something went wrong while loading countries.</Text>
                <Text onPress={refetch} style={{ color: "blue", marginTop: 8 }}>Tap to retry</Text>
            </View>
        );
    }

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
            dropdownIconColor={"#000"}
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
        width: "50%",
        color: "#000",
    },
});