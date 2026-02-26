import api from "./api"
import { endpoints } from "./endpoints"

export const updateOnboardingStatus = async (onboarded, id) => {
    const res = await api.patch(`${endpoints.USERS}/${id}`, {
        onboarded
    })
    return res.data
}