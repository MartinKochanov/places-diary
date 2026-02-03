import api from "./api"
import { places } from "./endpoints"



export const getPlaces = async (page = 1, perPage = 10, country = "") => {
    const res = await api.get(places.GET_PLACES, {
        params: {
            _page: page,
            _per_page: perPage,
            country: country
        },
    });

    return res.data.data;
};
