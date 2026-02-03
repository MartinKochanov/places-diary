import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { usePlaces } from "../hooks/places/usePlaces";
import PlaceCard from "../components/PlaceCard";

export default function PlacesScreen() {
    const { data, isLoading, error } = usePlaces();
    const [filter, setFilter] = useState("");

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Error loading places</Text>;

    const filteredPlaces = data.filter((p) =>
        p.country.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                placeholder="Filter by country..."
                value={filter}
                onChangeText={setFilter}
                style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 }}
            />
            <FlatList
                data={filteredPlaces}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (<PlaceCard place={item} />)}
            />
        </View>
    );
}

//TODO : Add error handling and empty state UI in PlacesScreen
//TODO: Implement pull-to-refresh functionality in PlacesScreen
//TODO: Add pagination support in PlacesScreen for large datasets
//TODO: Apply filter on the server side instead of client side in PlacesScreen