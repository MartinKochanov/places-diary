import { useQuery } from "@tanstack/react-query"
import { getPlaceById } from "../api/placesService"

export const usePlace = (id) => {
    return useQuery({
        queryKey: ["place", id],
        queryFn: () => getPlaceById(id),
        enabled: !!id
    })
}