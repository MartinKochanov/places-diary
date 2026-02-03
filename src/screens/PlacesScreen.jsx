import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { usePlaces } from "../hooks/places/usePlaces";
import PlaceCard from "../components/PlaceCard";

export default function PlacesScreen() {
    const [filter, setFilter] = useState("");
    const {
        data,
        isLoading,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
        isFetching,
    } = usePlaces();

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Something went wrong while loading places.</Text>
            </View>
        );
    }

    const places = data?.pages.flat() ?? [];

    const filteredPlaces = places.filter((p) =>
        (p.country ?? "").toLowerCase().includes(filter.toLowerCase())
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
                ListEmptyComponent={<Text>No places found.</Text>}
                refreshing={isFetching}
                onRefresh={refetch}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? <ActivityIndicator /> : null
                }
            />
        </View>
    );
}

//TODO: Apply filter on the server side instead of client side in PlacesScreen