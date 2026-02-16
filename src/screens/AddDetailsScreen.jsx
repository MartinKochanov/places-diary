import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreatePlaceMutation } from "../hooks/places/useCreatePlaceMutation";

export default function AddDetailsScreen({ route, navigation }) {
    const { place } = route.params;

    const [title, setTitle] = useState(place.title.trim());
    const [notes, setNotes] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [dateVisited, setDateVisited] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [errors, setErrors] = useState({});

    const {
        mutateAsync: createPlace,
        isPending
    } = useCreatePlaceMutation();

    const pickImage = async () => {
        const permission =
            await ImagePicker.getMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                alert(
                    "Please enable photo access in Settings to add images."
                );
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const validate = () => {
        const newErrors = {};
        const today = new Date();

        if (!title || title.length < 1 || title.length > 50) {
            newErrors.title = "Title must be between 1 and 50 characters";
        }

        if (!notes.trim()) {
            newErrors.notes = "Description is required";
        }

        if (dateVisited > today) {
            newErrors.dateVisited = "Date cannot be in the future";
        }

        if (!imageUrl) {
            newErrors.imageUrl = "Photo is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        const newPlace = {
            ...place,
            title,
            notes,
            dateVisited: dateVisited.toISOString().slice(0, 10),
            imageUrl,
            isFavourite: false,
        };

        try {
            await createPlace(newPlace);

            navigation.reset({
                index: 0,
                routes: [{ name: "PlacesList" }],
            });
        } catch (err) {
            console.error("Create place failed", err);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                value={title}
                onChangeText={setTitle}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, styles.notesInput, errors.notes && styles.inputError]}
                value={notes}
                onChangeText={setNotes}
                multiline
            />
            {errors.notes && <Text style={styles.error}>{errors.notes}</Text>}

            <Text style={styles.label}>Date Visited</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateBtn}>
                <Text>{dateVisited.toISOString().slice(0, 10)}</Text>
            </TouchableOpacity>
            {errors.dateVisited && <Text style={styles.error}>{errors.dateVisited}</Text>}

            {showDatePicker && (
                <DateTimePicker
                    value={dateVisited}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={(e, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDateVisited(selectedDate);
                    }}
                />
            )}

            <Text style={styles.label}>Photo</Text>
            <View style={styles.photosRow}>
                {imageUrl && <Image source={{ uri: imageUrl }} style={styles.photo} />}
                <TouchableOpacity onPress={pickImage} style={styles.addPhotoBtn}>
                    <Text style={styles.addPhotoText}>+</Text>
                </TouchableOpacity>
                {errors.imageUrl && <Text style={styles.error}>{errors.imageUrl}</Text>}
            </View>

            <TouchableOpacity
                onPress={handleSave}
                disabled={isPending}
                style={[styles.saveButton, isPending && styles.disabledBtn]}
            >
                {isPending ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>Save Place</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 16 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    label: { fontWeight: "bold", marginTop: 16 },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        minHeight: 60,
        marginTop: 8,
    },
    notesInput: {
        height: 270,
        textAlignVertical: 'top',
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
    saveButton: {
        backgroundColor: 'teal',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputError: {
        borderColor: "red",
    },
    error: {
        color: "red",
        marginTop: 4,
    },
    disabledBtn: {
        opacity: 0.6,
    },
});
