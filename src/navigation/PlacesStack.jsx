import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import CreatePlaceScreen from "../screens/CreatePlaceScreen";

const Stack = createNativeStackNavigator();

export default function PlacesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PlacesList"
                component={PlacesScreen}
                options={{ title: "Places" }}
            />

            <Stack.Screen
                name="PlaceDetails"
                component={PlaceDetailsScreen}
                options={{ title: "Place Details", }}
            />

            <Stack.Screen
                name="CreatePlace"
                component={CreatePlaceScreen}
                options={{ title: "Create Place", }}
            />
        </Stack.Navigator>
    );
}
