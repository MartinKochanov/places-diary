import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useForm, Controller } from "react-hook-form";

const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY; // your LocationIQ token

export default function CreatePlaceScreen() {
    const { control, setValue, handleSubmit } = useForm();

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [results, setResults] = useState([]);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            const loc = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = loc.coords;

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            setValue("latitude", latitude);
            setValue("longitude", longitude);
        })();
    }, []);

    /* ---------- Debounce query ---------- */
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 400); // wait 400ms after user stops typing

        return () => clearTimeout(handler);
    }, [query]);

    /* ---------- Search places when debounced query changes ---------- */
    useEffect(() => {
        if (debouncedQuery.length < 3) {
            setResults([]);
            return;
        }

        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${encodeURIComponent(
                        debouncedQuery
                    )}&format=json`
                );
                const data = await res.json();
                // Deduplicate by place_id
                const uniqueData = Array.from(
                    new Map(data.map((item) => [item.place_id, item])).values()
                );
                setResults(uniqueData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [debouncedQuery]);

    /* ---------- Select a suggestion ---------- */
    const selectPlace = (item) => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);

        setQuery(item.display_name);
        setResults([]);

        // Autofill fields
        setValue(
            "title",
            item.address.name + " " + item.address.city + " " + item.address.country
        );
        setValue("city", item.address.city || "");
        setValue("country", item.address.country || "");
        setValue("latitude", lat);
        setValue("longitude", lng);

        setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });

        console.log("Selected place:", item);

    };

    /* ---------- Map press override ---------- */
    const onMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setValue("latitude", latitude);
        setValue("longitude", longitude);

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });
    };

    /* ---------- Submit ---------- */
    const onSubmit = (data) => {
        console.log("NEW PLACE:", data);
        // TODO: call mutation to save place
    };

    return (
        <View style={styles.container}>
            {/* Search */}
            <TextInput
                placeholder="Search place (e.g., Eiffel Tower Paris)"
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />

            {/* Loading indicator */}
            {loading && <ActivityIndicator size="small" />}

            {/* Suggestions */}
            {results.length > 0 && (
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

            {/* Map */}
            {region && (
                <MapView style={styles.map} region={region} onPress={onMapPress}>
                    <Marker coordinate={region} />
                </MapView>
            )}

            {/* Hidden form fields */}
            <Controller name="title" control={control} render={() => null} />
            <Controller name="city" control={control} render={() => null} />
            <Controller name="country" control={control} render={() => null} />
            <Controller name="latitude" control={control} render={() => null} />
            <Controller name="longitude" control={control} render={() => null} />

            <Button title="Save Place" onPress={handleSubmit(onSubmit)} />
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
});
