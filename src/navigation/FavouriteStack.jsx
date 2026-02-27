import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritePlacesScreen from "../screens/places/FavouritePlacesScreen";
import PlaceDetailsScreen from "../screens/places/PlaceDetailsScreen";
import EditPlaceScreen from "../screens/places/EditPlaceScreen";
import LogoutButton from "../components/LogoutButton";

const Stack = createNativeStackNavigator();

export default function FavouritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FavouritesList"
                component={FavouritePlacesScreen}
                options={{ title: "Favourites", headerRight: () => <LogoutButton /> }}
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
