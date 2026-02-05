import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

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
        </Stack.Navigator>
    );
}
