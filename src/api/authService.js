import api from "./api"
import { endpoints } from "./endpoints"

export const register = async (data) => {
    await api.post(endpoints.USERS, data);
};

export const login = async (email, password) => {
    const res = await api.post(endpoints.AUTH, { email, password });
    return res.data
}

export const getMe = async () => {
    const res = await api.get(endpoints.ME)
    return res.data
}