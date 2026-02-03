import { useInfiniteQuery } from "@tanstack/react-query"
import { getPlaces } from "../../api/placesService"


const PER_PAGE = 10;

export const usePlaces = () => {
    return useInfiniteQuery({
        queryKey: ["places"],
        queryFn: ({ pageParam = 1 }) =>
            getPlaces(pageParam, PER_PAGE),

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PER_PAGE) return undefined;
            return allPages.length + 1;
        },
    });
};
