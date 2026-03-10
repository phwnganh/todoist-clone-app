import {api} from "./api.ts";
import type {User, UserPayload} from "@/types/user.type.ts";
import type {SyncResponse} from "@/types/api.type.ts";

export const apiGetUserProfile = () => {
    return api.get<User>('/user')
}

export const apiUpdateUserProfile = async (payload: UserPayload): Promise<SyncResponse> => {
    const uuid = crypto.randomUUID()
    const tempId = `temp-user-${uuid}`
    return api.sync<SyncResponse, UserPayload>([
        {
            type: "user_update",
            uuid,
            temp_id: tempId,
            args: payload
        }
    ])
}