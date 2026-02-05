import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesScreen from "../screens/PlacesScreen";

const Stack = createNativeStackNavigator();

export default function PlacesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PlacesList"
                component={PlacesScreen}
                options={{ title: "Places" }}
            />
        </Stack.Navigator>
    );
}
