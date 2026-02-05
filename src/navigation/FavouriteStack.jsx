import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritePlacesScreen from "../screens/FavouritePlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function FavouritesStack() {
    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    );
}
