import { View, Text, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import PlaceCard from "../../components/PlaceCard";
import CountryPicker from "../../components/PlacesPicker";
import { useFavouritePlaces } from "../../hooks/places/useFavouritePlaces";
import EmptyState from "../../components/EmptyState";

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
                <Text onPress={refetch} style={{ color: "blue", marginTop: 8 }}>Tap to retry</Text>
            </View>
        );
    }

    const places = data?.pages?.flatMap(page => page?.content ?? []) ?? [];

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
                ListEmptyComponent={
                    <EmptyState
                        title="No Favourite Places Found"
                        message="You haven't added any favourite places yet."
                        iconName="heart-outline"
                        onRetry={refetch}
                    />
                }
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
