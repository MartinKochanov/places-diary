import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
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
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Places";
                    return {
                        title: "Places",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="map" size={size} color={color} />
                        ),
                        tabBarStyle: routeName === "PlaceDetails" ? { display: "none" } : {},
                    };
                }}
            />
            <Tab.Screen
                name="FavouritesTab"
                component={FavouritesStack}
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? "Favourites";
                    return {
                        title: "Favourites",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                        tabBarStyle: routeName === "PlaceDetails" ? { display: "none" } : {},
                    };
                }}
            />
        </Tab.Navigator>
    );
}
