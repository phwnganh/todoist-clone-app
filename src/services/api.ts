import {useAuthStore} from "../stores/auth.store.ts";
import {BASE_URL, BASE_URL_SYNC, VIEW_OPTIONS_BASE_URL_SYNC} from "../constants/api.constants.ts";
import type {ApiError, ApiOptions, SyncCommand, SyncPayload} from "../types/api.type.ts";

async function handleError(res: Response): Promise<ApiError>{

    switch(res.status){
        case 400:
            return {
                status: 400,
                code: "BAD_REQUEST",
                message: "Bad Request",
            }
        case 403:
            return {
                status: 403,
                code: "FORBIDDEN",
                message: "You do not have permission to access this resource",
            }
            case 404:
                return {
                    status: 404,
                    code: "NOT_FOUND",
                    message: "Not Found",
                }
        case 429:
            return {
                status: 429,
                code: "RATE_LIMITED",
                message: "Too many requests",
            }
        default:
            if(res.status >= 500){
                return {
                    status: res.status,
                    code: "SERVER_ERROR",
                    message: "Internal Server Error",
                }
            }
        return {
                status: res.status,
                code: "UNKNOWN_ERROR",
                message: "Unexpected Server Error",
        }
    }
}

async function request<TResponse, TBody = undefined>(endpoint: string, options: ApiOptions<TBody> = {}): Promise<TResponse> {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw {
            status: 401,
            code: "UNAUTHORIZED",
            message: "Invalid or missing token",
        } satisfies ApiError
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    })

    if(!res.ok){
        throw await handleError(res)
    }

    if(res.status === 204){
        return null as TResponse;
    }
    return res.json();
}

async function syncRequest<TResponse, TArgs>(commands: SyncCommand<TArgs>[]): Promise<TResponse>{
    const token = useAuthStore.getState().token;
    if (!token) {
        throw {
            status: 401,
            code: "UNAUTHORIZED",
            message: "Invalid or missing token",
        } satisfies ApiError
    }

    const body: SyncPayload<TArgs> = {
        sync_token: "*",
        commands
    }

    const res = await fetch(BASE_URL_SYNC, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    if(!res.ok){
        throw await handleError(res)
    }
    return res.json();
}

async function syncViewOptionsRequest<TResponse, TArgs>(commands: SyncCommand<TArgs>[]): Promise<TResponse>{
    const token = useAuthStore.getState().token;
    if(!token){
        throw {
            status: 401,
            code: "UNAUTHORIZED",
            message: "Invalid or missing token",
        } satisfies ApiError
    }

    const body: SyncPayload<TArgs> = {
        sync_token: "*",
        commands
    }

    const res = await fetch(VIEW_OPTIONS_BASE_URL_SYNC, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })

    if(!res.ok){
        throw await handleError(res)
    }
    return res.json()
}
export const api = {
    get<T>(endpoint: string){
        return request<T>(endpoint)
    },
    delete<T>(endpoint: string){
        return request<T>(endpoint, {
            method: "DELETE",
        })
    },
    sync<TResponse, TArgs>(commands: SyncCommand<TArgs>[]){
        return syncRequest<TResponse, TArgs>(commands)
    },
    viewOptionsSync<TResponse, TArgs>(commands: SyncCommand<TArgs>[]){
        return syncViewOptionsRequest<TResponse, TArgs>(commands)
    }
}

