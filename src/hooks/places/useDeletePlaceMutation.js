import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePlace } from "../../api/placesService"

export const useDeletePlaceMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePlace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["places"] })
            queryClient.invalidateQueries({ queryKey: ["favPlaces"] })
        }
    })
} 