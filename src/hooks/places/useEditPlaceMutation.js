import { useMutation, useQueryClient } from "@tanstack/react-query"
import { editPlace } from "../../api/placesService";

export const useEditPlaceMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => editPlace(id, data),
        onSuccess: (updatedPlace) => {
            queryClient.invalidateQueries({ queryKey: ['places'] });
            queryClient.invalidateQueries({ queryKey: ["place", updatedPlace.id] });
            queryClient.invalidateQueries({ queryKey: ["favPlaces"] })

        }
    })
}