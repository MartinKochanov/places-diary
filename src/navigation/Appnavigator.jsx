import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesScreen from "../screens/PlacesScreen";

const Stack = createNativeStackNavigator();

export default function Appnavigator() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Places"
                component={PlacesScreen}
                options={{ title: "Places Visited" }}
            />
        </Stack.Navigator>
    );
}