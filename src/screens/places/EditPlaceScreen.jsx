import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEditPlaceMutation } from "../../hooks/places/useEditPlaceMutation";
import { useImagePicker } from "../../hooks/image/useImagePicker";

export default function EditPlaceScreen() {
    const { params } = useRoute();
    const { place } = params;
    const navigation = useNavigation();

    const [title, setTitle] = useState(place.title);
    const [notes, setNotes] = useState(place.notes);
    const [dateVisited, setDateVisited] = useState(
        new Date(place.dateVisited)
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({});

    const { mutateAsync: editPlace, isLoading } =
        useEditPlaceMutation();

    const { imageUrl, pickImage } = useImagePicker(place.imageUrl);

    const validate = () => {
        const newErrors = {};
        const today = new Date();

        if (!title || title.length < 1 || title.length > 50) {
            newErrors.title =
                "Title must be between 1 and 50 characters";
        }

        if (!notes.trim()) {
            newErrors.notes = "Description is required";
        }

        if (dateVisited > today) {
            newErrors.dateVisited =
                "Date cannot be in the future";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;

        await editPlace({
            id: place.id,
            data: {
                title,
                notes,
                imageUrl,
                dateVisited: dateVisited
                    .toISOString()
                    .slice(0, 10),
            },
        });

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={[
                        styles.input,
                        errors.title && styles.inputError,
                    ]}
                    value={title}
                    onChangeText={setTitle}
                />
                {errors.title && (
                    <Text style={styles.error}>
                        {errors.title}
                    </Text>
                )}

                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[
                        styles.input,
                        styles.notesInput,
                        errors.notes && styles.inputError,
                    ]}
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                />
                {errors.notes && (
                    <Text style={styles.error}>
                        {errors.notes}
                    </Text>
                )}

                <Text style={styles.label}>Date Visited</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.dateBtn}
                >
                    <Text>
                        {dateVisited
                            .toISOString()
                            .slice(0, 10)}
                    </Text>
                </TouchableOpacity>
                {errors.dateVisited && (
                    <Text style={styles.error}>
                        {errors.dateVisited}
                    </Text>
                )}

                {showDatePicker && (
                    <DateTimePicker
                        value={dateVisited}
                        mode="date"
                        maximumDate={new Date()}
                        onChange={(e, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate)
                                setDateVisited(selectedDate);
                        }}
                    />
                )}

                <Text style={styles.label}>Photo</Text>
                <View style={styles.photosRow}>
                    {imageUrl && (
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.photo}
                        />
                    )}

                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.addPhotoBtn}
                    >
                        <Text style={styles.addPhotoText}>+</Text>
                    </TouchableOpacity>
                </View>
                {errors.imageUrl && (
                    <Text style={styles.error}>
                        {errors.imageUrl}
                    </Text>
                )}

                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isLoading}
                    style={[
                        styles.saveButton,
                        isLoading && styles.disabledBtn,
                    ]}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            Save changes
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: { paddingHorizontal: 16, paddingBottom: 40 },
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