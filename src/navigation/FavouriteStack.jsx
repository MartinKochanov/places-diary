import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritePlacesScreen from "../screens/places/FavouritePlacesScreen";
import PlaceDetailsScreen from "../screens/places/PlaceDetailsScreen";
import EditPlaceScreen from "../screens/places/EditPlaceScreen";

const Stack = createNativeStackNavigator();

export default function FavouritesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="FavouritesList"
                component={FavouritePlacesScreen}
                options={{ title: "Favourites" }}
            />
            <Stack.Screen
                name="PlaceDetails"
                component={PlaceDetailsScreen}
                options={{ title: "Place Details" }}
            />
            <Stack.Screen
                name="EditPlace"
                component={EditPlaceScreen}
                options={{ title: "Edit Place" }}
            />
        </Stack.Navigator>
    );
}
