import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlacesStack from "./PlacesStack";
import FavouritesStack from "./FavouriteStack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="PlacesTab"
                component={PlacesStack}
                options={{
                    title: "Places",
                    tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />
                }}
            />
            <Tab.Screen
                name="FavouritesTab"
                component={FavouritesStack}
                options={{
                    title: "Favourites",
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
                }}
                initialParams={{}}
            />
        </Tab.Navigator>
    );
}
