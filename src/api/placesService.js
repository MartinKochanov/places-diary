import api from "./api"
import { places } from "./endpoints"



export const getPlaces = async (page = 1, perPage = 10) => {
    const res = await api.get(places.GET_PLACES, {
        params: {
            _page: page,
            _per_page: perPage,
        },
    });

    return res.data.data;
};
