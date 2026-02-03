import api from "./api"
import { places } from "./endpoints"



export const getPlaces = async () => {
    const res = await api.get(places.GET_PLACES);
    return res.data
}