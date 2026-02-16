import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { usePlace } from "../hooks/places/usePlace";
import { useToggleFavouriteMutation } from "../hooks/places/useToggleFavouriteMutation";
import { useDeletePlaceMutation } from "../hooks/places/useDeletePlaceMutation";

export default function PlaceDetailsScreen() {
    const { params } = useRoute();
    const { placeId } = params;

    const { data: place, isLoading, error } = usePlace(placeId);
    const { mutateAsync: toggleFavouriteMutation } = useToggleFavouriteMutation();
    const { mutateAsync: deletePlaceMutation } = useDeletePlaceMutation();
    const navigation = useNavigation();

    const handleToggleFavourite = async () => {
        await toggleFavouriteMutation({
            id: place.id,
            isFavourite: !place.isFavourite,
        });
    };

    const handleEdit = () => {
        navigation.navigate("EditPlace", { place });
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete place",
            "Are you sure you want to delete this place?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deletePlaceMutation(place.id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Failed to load place</Text>;

    return (
        <ScrollView>
            <Image source={{ uri: place.imageUrl }} style={styles.image} />

            <View style={styles.header}>
                <Text style={styles.title}>{place.title}</Text>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={handleToggleFavourite}>
                        <Ionicons
                            name={place.isFavourite ? "heart" : "heart-outline"}
                            size={26}
                            color="tomato"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleEdit}>
                        <Ionicons name="create-outline" size={26} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name="trash-outline" size={26} color="crimson" />
                    </TouchableOpacity>
                </View>
            </View>


            <View style={styles.locationRow}>
                <View>
                    <Text style={styles.location}>
                        {place.city}, {place.country}
                    </Text>
                </View>
                <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.dateText}>
                        {new Date(place.dateVisited).toLocaleDateString()}
                    </Text>
                </View>
            </View>


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
        paddingHorizontal: 16,
        paddingVertical: 8,
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
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateText: {
        color: "#666",
        marginLeft: 4,
    },
    locationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
    },
    actionsContainer: {
        flexDirection: "row",
        gap: 12,
    },
});
