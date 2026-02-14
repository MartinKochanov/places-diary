import { endpoints } from "./endpoints";

const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

export async function reverseGeocode(lat, lon) {
    const res = await fetch(
        `${endpoints.REVERSE_GEOCODE}?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`
    );
    return res.json();
}

export async function autocompletePlaces(query) {
    const res = await fetch(
        `${endpoints.AUTOCOMPLETE}?key=${API_KEY}&q=${encodeURIComponent(
            query
        )}&format=json`
    );
    return res.json();
}
