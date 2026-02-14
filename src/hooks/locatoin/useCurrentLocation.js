import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { reverseGeocode } from "../../api/locationService";

export function useCurrentLocation() {
    const [region, setRegion] = useState(null);
    const [initialQuery, setInitialQuery] = useState("");

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            const loc = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = loc.coords;

            setRegion({
                latitude,
                longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            });

            const data = await reverseGeocode(latitude, longitude);
            if (data?.display_name) {
                setInitialQuery(data.display_name);
            }
        })();
    }, []);

    return { region, setRegion, initialQuery };
}
