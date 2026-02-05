import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

function PlaceCard({ place }) {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate("PlaceDetails", { placeId: place.id });
    }

    return (
        <Pressable style={styles.card} onPress={onPress}>
            {place.imageUrl && (
                <Image
                    source={{ uri: place.imageUrl }}
                    style={styles.image}
                />
            )}
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.subtitle}>{place.city}, {place.country}</Text>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        elevation: 2,
    },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#666",
    },
});

export default memo(PlaceCard);