import { useInfiniteQuery } from "@tanstack/react-query"
import { getPlaces } from "../../api/placesService"


const PER_PAGE = 99999999;

export const usePlaces = (country) => {
    return useInfiniteQuery({
        queryKey: ["places", country],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await getPlaces(pageParam, PER_PAGE, country);
            return res;
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage || lastPage.last) return undefined;
            return lastPage.number + 1;
        },
    });
};