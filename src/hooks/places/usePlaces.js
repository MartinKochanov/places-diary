import { useInfiniteQuery } from "@tanstack/react-query"
import { getPlaces } from "../../api/placesService"


const PER_PAGE = 10;

export const usePlaces = (country) => {
    return useInfiniteQuery({
        queryKey: ["places", country],
        queryFn: ({ pageParam = 1 }) =>
            getPlaces(pageParam, PER_PAGE, country),

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PER_PAGE) return undefined;
            return allPages.length + 1;
        },
    });
};
