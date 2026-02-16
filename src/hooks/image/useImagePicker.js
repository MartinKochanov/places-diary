import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export function useImagePicker(initialImage = "") {
    const [imageUrl, setImageUrl] = useState(initialImage);

    const pickImage = async () => {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== "granted") {
                alert("Please enable photo access in Settings to add images.");
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

    return { imageUrl, setImageUrl, pickImage };
}
