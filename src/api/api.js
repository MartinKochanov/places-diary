import axios from "axios"
import * as SecureStore from "expo-secure-store"

const api = axios.create({
    baseURL: `https://placec-diary-be.onrender.com/api/v1/`,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");

    if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default api;
