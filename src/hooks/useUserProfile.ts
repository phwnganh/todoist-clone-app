import {useQuery} from "@tanstack/react-query";
import {apiGetUserProfile} from "../services/user.service.ts";

export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: apiGetUserProfile,
    })
}