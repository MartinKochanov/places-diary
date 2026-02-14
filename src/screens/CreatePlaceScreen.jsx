import { useEffect, useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useNavigation } from "@react-navigation/native";

const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

export default function CreatePlaceScreen() {
    const navigation = useNavigation();
    const { setValue } = useForm();

    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 400);
    const [results, setResults] = useState([]);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);

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

            try {
                const res = await fetch(
                    `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
                );
                const data = await res.json();
                if (data && data.display_name) {
                    setQuery(data.display_name);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

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

    const selectPlace = (item) => {
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        const place = {
            title: item.address.name || "",
            city: item.address.city || "",
            country: item.address.country || "",
            latitude: lat,
            longitude: lng,
        };
        setSelectedPlace(place);
        setQuery(item.display_name);
        setResults([]); // Clear suggestions after selection
        setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });
    };

    const onMapPress = async (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setValue("latitude", latitude);
        setValue("longitude", longitude);

        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        });

        try {
            const res = await fetch(
                `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            if (data && data.display_name) {
                setQuery(data.display_name);
                const place = {
                    title: (data.address?.name || "") + " " + (data.address?.city || "") + " " + (data.address?.country || ""),
                    city: data.address?.city || "",
                    country: data.address?.country || "",
                    latitude,
                    longitude,
                };
                setSelectedPlace(place);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSearchChange = (text) => {
        setQuery(text);
        if (selectedPlace) {
            setSelectedPlace(null);
        }
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
                    onPress={() => navigation.navigate("AddDetails", { place: selectedPlace })}
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
