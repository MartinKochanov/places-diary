import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

function FavouritesScreen() {
    return (
        <View>
            <Text>Favourites</Text>
        </View>
    );
}

export default function FavouritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FavouritesList"
                component={FavouritesScreen}
                options={{ title: "Favourites" }}
            />
        </Stack.Navigator>
    );
}
