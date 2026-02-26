import axios from "axios"
import * as SecureStore from "expo-secure-store"

const LOCAL_IP = process.env.EXPO_PUBLIC_LOCAL_IP
const api = axios.create({
    baseURL: `http://${LOCAL_IP}:8080/api/v1`,
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
