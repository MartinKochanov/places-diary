import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/authService";

export function useRegisterMutation() {
    return useMutation({
        mutationFn: register,
    });
}