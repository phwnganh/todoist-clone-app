export type ApiError = {
    status: number;
    code: string;
    message: string;
    raw?: unknown;
}

export type OauthTokenResponse = {
    access_token: string;
    token_type: string;
}