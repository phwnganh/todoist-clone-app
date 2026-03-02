import type {DeleteViewOptionsPayload, ViewOptionsPayload} from "../types/viewOptions.type.ts";
import {api} from "./api.ts";
import type {SyncResponse} from "../types/api.type.ts";

export const apiViewOptions = async (payload: ViewOptionsPayload) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, ViewOptionsPayload>([
        {
            type: "view_options_set",
            uuid: uuid,
            args: payload
        }
    ])
}

export const apiDeleteViewOptions = async (payload: DeleteViewOptionsPayload) => {
    const uuid = crypto.randomUUID()
    return api.sync<SyncResponse, DeleteViewOptionsPayload>([
        {
            type: "view_options_delete",
            uuid: uuid,
            args: payload
        }
    ])
}