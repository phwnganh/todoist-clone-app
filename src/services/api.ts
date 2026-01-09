import {useAuthStore} from "../stores/auth.store.ts";
import {BASE_URL} from "../constants/api.constants.ts";
import type {ApiError} from "../types/api.type.ts";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type ApiOptions<TBody> = {
    method?: HttpMethod;
    body?: TBody;
    headers?: HeadersInit;
}

async function handleError(res: Response): Promise<ApiError>{
    let errorBody: any = null;

    try {
        errorBody = await res.json();
    }catch(err){
        console.log(err);
    }
    switch(res.status){
        case 400:
            return {
                status: 400,
                code: "BAD_REQUEST",
                message: "Bad Request",
                raw: errorBody
            }
        case 401:
            return {
                status: 401,
                code: "UNAUTHORIZED",
                message: "Invalid or missing token",
                raw: errorBody
            }
        case 403:
            return {
                status: 403,
                code: "FORBIDDEN",
                message: "You do not have permission to access this resource",
                raw: errorBody
            }
            case 404:
                return {
                    status: 404,
                    code: "NOT_FOUND",
                    message: "Not Found",
                    raw: errorBody
                }
        case 429:
            return {
                status: 429,
                code: "RATE_LIMITED",
                message: "Too many requests",
                raw: errorBody
            }
        default:
            if(res.status >= 500){
                return {
                    status: res.status,
                    code: "SERVER_ERROR",
                    message: "Internal Server Error",
                    raw: errorBody
                }
            }
        return {
                status: res.status,
                code: "UNKNOWN_ERROR",
                message: "Unexpected Server Error",
                raw: errorBody
        }
    }
}

async function request<TResponse, TBody = undefined>(endpoint: string, options: ApiOptions<TBody> = {}): Promise<TResponse> {
    const token = useAuthStore.getState().token;
    if (!token) {
        throw {
            status: 401,
            code: "UNAUTHORIZED",
            message: "No token provided",
        } satisfies ApiError
    }

    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: options.method || "GET",
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

export const api = {
    get<T>(endpoint: string){
        return request<T>(endpoint)
    },
    post<T, B>(endpoint: string, body: B){
        return request<T, B>(endpoint, {
            method: "POST",
            body
        })
    },
    put<T, B>(endpoint: string, body: B){
        return request<T, B>(endpoint, {
            method: "PUT",
            body
        })
    },
    delete<T>(endpoint: string){
        return request<T>(endpoint, {
            method: "DELETE",
        })
    }
}