const API_KEY = process.env.EXPO_PUBLIC_LOCATIONIQ_API_KEY;

export async function reverseGeocode(lat, lon) {
    const res = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`
    );
    return res.json();
}

export async function autocompletePlaces(query) {
    const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${API_KEY}&q=${encodeURIComponent(
            query
        )}&format=json`
    );
    return res.json();
}
