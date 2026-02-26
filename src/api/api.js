import axios from "axios"

const LOCAL_IP = process.env.EXPO_PUBLIC_LOCAL_IP
const api = axios.create({
    baseURL: `http://${LOCAL_IP}:8080/api/v1`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
