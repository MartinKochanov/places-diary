import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import { usePlaces } from "../hooks/places/usePlaces";
import PlaceCard from "../components/PlaceCard";
import CountryPicker from "../components/PlacesPicker";

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
    } = usePlaces(filter);

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
            <CountryPicker
                selectedValue={filter}
                onValueChange={setFilter}
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
