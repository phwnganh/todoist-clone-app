export type ApiError = {
    status: number;
    code: string;
    message: string;
}

export type OauthTokenResponse = {
    access_token: string;
    token_type: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type ApiOptions<TBody> = {
    method?: HttpMethod;
    body?: TBody;
    headers?: HeadersInit;
}

export type SyncCommand<TArgs> = {
    type: string;
    uuid: string;
    temp_id?: string;
    args: TArgs;
}

export type SyncPayload<TArgs> = {
    sync_token: string;
    commands: SyncCommand<TArgs>[]
}

export type SyncStatus = "ok" | "error"
export type SyncCommandStatusMap = Record<string, SyncStatus>
export type TempIdMapping = Record<string, string>;
export type SyncResponse = {
    full_sync: boolean;
    full_sync_date_utc: string;
    sync_status: SyncCommandStatusMap;
    sync_token: string;
    temp_id_mapping?: TempIdMapping;
}