import { useQuery } from "@tanstack/react-query"
import { getCountries } from "../../api/placesService"

export const useCountries = () => {
    return useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
        staleTime: Infinity
    })
}  