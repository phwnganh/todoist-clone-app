import {useQuery} from "@tanstack/react-query";
import {apiGetAllProjects} from "../services/project.service.ts";

export const useGetAllProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => apiGetAllProjects()
    })
}