import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import { usePlaces } from "../../hooks/places/usePlaces";
import PlaceCard from "../../components/PlaceCard";
import CountryPicker from "../../components/PlacesPicker";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "../../components/EmptyState";

export default function PlacesScreen({ navigation }) {
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <CountryPicker
                    selectedValue={filter}
                    onValueChange={setFilter}
                />
                <TouchableOpacity onPress={() => navigation.navigate("CreatePlace")}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={places}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <EmptyState
                        title="No Places Found"
                        message={filter ? `We couldn't find any places in ${filter}. Try a different location!` : "Start by adding your first place!"}
                        iconName="search-outline"
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
