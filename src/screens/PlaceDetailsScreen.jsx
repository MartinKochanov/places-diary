import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { usePlace } from "../hooks/usePlace";
import { useToggleFavouriteMutation } from "../hooks/useToggleFavouriteMutation";

export default function PlaceDetailsScreen() {
    const { params } = useRoute();
    const { placeId } = params;

    const { data: place, isLoading, error } = usePlace(placeId);
    const { mutateAsync: toggleFavouriteMutation } = useToggleFavouriteMutation();

    const handleToggleFavourite = async () => {
        await toggleFavouriteMutation({
            id: place.id,
            isFavourite: !place.isFavourite,
        });
    };

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Failed to load place</Text>;

    return (
        <ScrollView>
            <Image source={{ uri: place.imageUrl }} style={styles.image} />

            <View style={styles.header}>
                <Text style={styles.title}>{place.title}</Text>
                <TouchableOpacity onPress={handleToggleFavourite}>
                    <Ionicons
                        name={place.isFavourite ? "heart" : "heart-outline"}
                        size={28}
                        color="tomato"
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.location}>
                {place.city}, {place.country}
            </Text>

            <Text style={styles.notes}>{place.notes}</Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: place.latitude,
                        longitude: place.longitude,
                    }}
                    title={place.title}
                />
            </MapView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 220,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        flex: 1,
        marginRight: 8,
    },
    location: {
        paddingHorizontal: 16,
        color: "#666",
        marginBottom: 8,
    },
    notes: {
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    map: {
        height: 350,
        margin: 16,
        borderRadius: 12,
    },
});
