import { useInfiniteQuery } from "@tanstack/react-query"
import { getFavouritePlaces } from "../api/placesService"


const PER_PAGE = 10;

export const useFavouritePlaces = (country) => {
    return useInfiniteQuery({
        queryKey: ["favPlaces", country],
        queryFn: ({ pageParam = 1 }) =>
            getFavouritePlaces(pageParam, PER_PAGE, country),

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PER_PAGE) return undefined;
            return allPages.length + 1;
        },
    });
};
