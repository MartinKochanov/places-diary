import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleFavourite } from "../api/placesService"

export const useToggleFavouriteMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleFavourite,
        onMutate: async ({ id, isFavourite }) => {
            await queryClient.cancelQueries({ queryKey: ["place", id] });

            const previousPlace = queryClient.getQueryData(["place", id]);

            queryClient.setQueryData(["place", id], (old) => ({
                ...old,
                isFavourite,
            }));

            return { previousPlace };
        },

        onError: (_err, variables, context) => {
            if (context?.previousPlace) {
                queryClient.setQueryData(
                    ["place", variables.id],
                    context.previousPlace
                );
            }
        },

        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["place", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["places"] });
        },
    });
};