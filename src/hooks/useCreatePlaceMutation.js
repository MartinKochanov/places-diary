import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPlace } from "../api/placesService";

export const useCreatePlaceMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addPlace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        }
    })
}