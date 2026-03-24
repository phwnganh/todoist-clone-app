import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiGetUserProfile, apiUpdateUserProfile} from "@/services/user.service.ts";
import type {ApiError, SyncResponse} from "@/types/api.type.ts";
import type {User, UserPayload} from "@/types/user.type.ts";
import {
    type OptimisticUpdatesUserContext,
    optimisticUpdateUserProfile,
    rollbackOptimisticUserUpdates
} from "@/helpers/optimisticUpdates.ts";

export const useGetUserProfile = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: apiGetUserProfile,
    })
}

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient()
    return useMutation<SyncResponse, ApiError, UserPayload, OptimisticUpdatesUserContext>({
        mutationFn: apiUpdateUserProfile,
        onMutate: async (updatedUser) => {
            const tempId = `temp-user-${crypto.randomUUID()}`
            const optimisticUser: User = {
                id: tempId,
                full_name: updatedUser.full_name ?? "",
                email: updatedUser.email ?? "",
                theme_id: String(updatedUser.theme)
            }
            const res = optimisticUpdateUserProfile({
                queryClient,
                optimisticUpdateUserProfile: optimisticUser
            })
            return {...res, tempId}
        },
        onSuccess: (res, _, context) => {
            const realId = res.temp_id_mapping?.[context.tempId!]
            if(!realId) return;
            queryClient.setQueryData<User>(["user"], old => {
                if(!old) return old;
                return {
                    ...old
                }
            })
        },
        onError: (_, __, context) => {
            rollbackOptimisticUserUpdates({
                queryClient,
                context
            })
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: ['user'],
            })
        }
    })
}