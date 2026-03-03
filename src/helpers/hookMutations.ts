import type {QueryClient} from "@tanstack/react-query";
import {rollbackOptimisticUpdates} from "./optimisticUpdates.ts";

export const commonTaskMutation = <TData, TVariables, TContext>(queryClient: QueryClient, options?: {
    onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void;
    invalidateOnSettled?: boolean
})=> ({
    onError: (_: unknown, __: TVariables, context: TContext | undefined) => {
        if(!context) return;
        rollbackOptimisticUpdates({
            queryClient,
            context
        })
    },
    onSuccess: options?.onSuccess,
    onSettled: () => {
        if(options?.invalidateOnSettled !== false){
            void queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    }
})