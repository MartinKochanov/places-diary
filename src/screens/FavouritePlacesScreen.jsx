import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import CountryPicker from "../components/PlacesPicker";
import { useFavouritePlaces } from "../hooks/useFavouritePlaces";

export default function FavouritePlacesScreen() {
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
    } = useFavouritePlaces(filter);

    const renderItem = useCallback(
        ({ item }) => <PlaceCard place={item} />,
        []
    );

    if (isLoading) return <ActivityIndicator size="large" />;
    if (error) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Something went wrong while loading places.</Text>
            </View>
        );
    }

    const places = data?.pages.flat() ?? [];

    return (
        <View style={{ padding: 16, marginBottom: 60 }}>
            <CountryPicker
                selectedValue={filter}
                onValueChange={setFilter}
            />

            <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
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
