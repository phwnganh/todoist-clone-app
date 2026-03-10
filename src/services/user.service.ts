import {api} from "./api.ts";
import type {User} from "@/types/user.type.ts";

export const apiGetUserProfile = () => {
    return api.get<User>('/user')
}