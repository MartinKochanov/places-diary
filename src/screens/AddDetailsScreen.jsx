import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddDetailsScreen({ route, navigation }) {
    const { place } = route.params;
    const [notes, setNotes] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [dateVisited, setDateVisited] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [title, setTitle] = useState(place.title.trim());

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access photos is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: false,
            quality: 0.7,
        });
        if (!result.canceled && result.assets && result.assets[0]?.uri) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        // Combine all data and save
        const newPlace = {
            ...place,
            title,
            notes,
            dateVisited: dateVisited.toISOString().slice(0, 10),
            imageUrl,
            isFavourite: false,
        };
        // TODO: Save newPlace (call API or local storage)
        console.log("SAVED PLACE:", newPlace);
        navigation.reset({
            index: 0,
            routes: [{ name: 'PlacesList' }],
        });
    };

    //TODO: Save all the details into the database and show them in the PlaceDetailsScreen. Also, consider adding an option to edit these details later on.

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Place title"
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={styles.input}
                placeholder="Add your notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
            />
            <Text style={styles.label}>Date Visited</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBtn}>
                <Text style={styles.dateBtnText}>{dateVisited.toISOString().slice(0, 10)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={dateVisited}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDateVisited(selectedDate);
                    }}
                />
            )}
            <Text style={styles.label}>Photo</Text>
            <View style={styles.photosRow}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.photo} />
                ) : null}
                <TouchableOpacity onPress={pickImage} style={styles.addPhotoBtn}>
                    <Text style={styles.addPhotoText}>+</Text>
                </TouchableOpacity>
            </View>
            <Button title="Save Place" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    label: { fontWeight: "bold", marginTop: 16 },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        minHeight: 60,
        marginTop: 8,
    },
    photosRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 12,
        flexWrap: "wrap",
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    addPhotoBtn: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        marginBottom: 8,
    },
    addPhotoText: {
        fontSize: 32,
        color: "#888",
    },
    dateBtn: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
        alignItems: 'center',
    },
    dateBtnText: {
        fontSize: 16,
        color: '#333',
    },
});
