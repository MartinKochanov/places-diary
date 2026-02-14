import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { reverseGeocode } from "../api/locationService";
import { useCurrentLocation } from "../hooks/locatoin/useCurrentLocation";
import { usePlaceSearch } from "../hooks/locatoin/usePlacesSreach";

export default function CreatePlaceScreen() {
    const navigation = useNavigation();

    const [query, setQuery] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);

    const { region, setRegion, initialQuery } = useCurrentLocation();
    const { results, loading, setResults } = usePlaceSearch(query);

    useEffect(() => {
        if (initialQuery) {
            setQuery(initialQuery);
        }
    }, [initialQuery]);

    const selectPlace = (item) => {
        const latitude = parseFloat(item.lat);
        const longitude = parseFloat(item.lon);

        const place = {
            title: item.address?.name || "",
            city: item.address?.city || "",
            country: item.address?.country || "",
            latitude,
            longitude,
        };

        setSelectedPlace(place);
        setQuery(item.display_name);
        setResults([]);

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });
    };

    const onMapPress = async (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });

        try {
            const data = await reverseGeocode(latitude, longitude);

            if (data?.display_name) {
                setQuery(data.display_name);

                setSelectedPlace({
                    title:
                        (data.address?.name || "") +
                        " " +
                        (data.address?.city || "") +
                        " " +
                        (data.address?.country || ""),
                    city: data.address?.city || "",
                    country: data.address?.country || "",
                    latitude,
                    longitude,
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearchChange = (text) => {
        setQuery(text);
        if (selectedPlace) setSelectedPlace(null);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search place (e.g., Eiffel Tower Paris)"
                value={query}
                onChangeText={handleSearchChange}
                style={styles.input}
            />

            {loading && <ActivityIndicator size="small" />}

            {results.length > 0 && !selectedPlace && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.place_id}
                    style={styles.dropdown}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => selectPlace(item)}
                            style={styles.itemWrapper}
                        >
                            <Text style={styles.item}>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <MapView style={styles.map} region={region} onPress={onMapPress}>
                {region && <Marker coordinate={region} />}
            </MapView>

            {selectedPlace && (
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={() =>
                        navigation.navigate("AddDetails", { place: selectedPlace })
                    }
                >
                    <Text style={styles.continueBtnText}>Continue</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
    },
    dropdown: {
        maxHeight: 180,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
    },
    itemWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    item: {
        padding: 10,
    },
    map: {
        flex: 1,
        marginVertical: 12,
        borderRadius: 12,
    },
    continueBtn: {
        backgroundColor: 'teal',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    continueBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
