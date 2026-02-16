import api from "./api"
import { endpoints } from "./endpoints"


export const addPlace = async (place) => {
    const res = await api.post(endpoints.PLACES, place)
    return res.data;
}

export const getPlaces = async (page = 1, perPage = 10, country = "") => {
    const res = await api.get(`${endpoints.PLACES}?_sort=-dateVisited,-id`, {
        params: {
            _page: page,
            _per_page: perPage,
            country: country
        },
    });

    return res.data.data;
};

export const getFavouritePlaces = async (page = 1, perPage = 10, country = "") => {
    const res = await api.get(`${endpoints.PLACES}?_sort=-dateVisited,-id`, {
        params: {
            _page: page,
            _per_page: perPage,
            isFavourite: true,
            country: country,
        },
    });

    return res.data.data;
};

export const getCountries = async () => {
    const res = await api.get(endpoints.PLACES);
    const result = res.data;

    return Array.from(
        new Set(result.map((p) => p.country).filter(Boolean))
    );
};

export const getPlaceById = async (id) => {
    const res = await api.get(`${endpoints.PLACES}/${id}`);
    return res.data;
}

export const editPlace = async (id, data) => {
    const res = await api.patch(`${endpoints.PLACES}/${id}`, data)
    return res.data
}

export const toggleFavourite = async ({ id, isFavourite }) => {
    const res = await api.patch(`${endpoints.PLACES}/${id}`, {
        isFavourite,
    })
    return res.data;
}

export const deletePlace = async (id) => {
    const res = await api.delete(`${endpoints.PLACES}/${id}`)

    return res.data
}