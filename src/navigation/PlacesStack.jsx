import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import CreatePlaceScreen from "../screens/CreatePlaceScreen";
import AddDetailsScreen from "../screens/AddDetailsScreen";
import EditPlaceScreen from "../screens/EditPlaceScreen";

const Stack = createNativeStackNavigator();

export default function PlacesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
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

            <Stack.Screen
                name="AddDetails"
                component={AddDetailsScreen}
                options={{ title: "Add Details" }}
            />

            <Stack.Screen
                name="EditPlace"
                component={EditPlaceScreen}
                options={{ title: "Edit Place" }}
            />

        </Stack.Navigator>
    );
}
