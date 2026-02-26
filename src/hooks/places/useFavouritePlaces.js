import { useInfiniteQuery } from "@tanstack/react-query"
import { getFavouritePlaces } from "../../api/placesService"


const PER_PAGE = 99999999;

export const useFavouritePlaces = (country) => {
    return useInfiniteQuery({
        queryKey: ["favPlaces", country],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await getFavouritePlaces(pageParam, PER_PAGE, country)
            return res;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.last) return undefined;
            return lastPage.number + 1;
        },
    });
};
