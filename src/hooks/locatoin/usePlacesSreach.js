import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { autocompletePlaces } from "../../api/locationService";

export function usePlaceSearch(query) {
    const [debouncedQuery] = useDebounce(query, 400);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (debouncedQuery.length < 3) {
            setResults([]);
            return;
        }

        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const data = await autocompletePlaces(debouncedQuery);
                const unique = Array.from(
                    new Map(data.map((i) => [i.place_id, i])).values()
                );
                setResults(unique);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [debouncedQuery]);

    return { results, loading, setResults };
}
