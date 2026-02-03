import { Picker } from "@react-native-picker/picker"
import { StyleSheet } from "react-native";

export default function CountryPicker({ selectedValue, onValueChange }) {
    return (

        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
        >
            <Picker.Item label="All countries" value="" />
            <Picker.Item label="Italy" value="Italy" />
            <Picker.Item label="France" value="France" />
            <Picker.Item label="USA" value="USA" />
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


//TODO: Get available countries from the server instead of hardcoding them in PlacesPicker