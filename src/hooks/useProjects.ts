import {useQuery} from "@tanstack/react-query";
import {apiGetAllProjects} from "../services/project.service.ts";

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: apiGetAllProjects,

    })
}