import { useQuery } from "@tanstack/react-query"
import { getPlaces } from "../../api/placesService"

export const usePlaces = () => {
    return useQuery({
        queryKey: ["places"],
        queryFn: getPlaces,
    })
}