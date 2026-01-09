export type ApiError = {
    status: number;
    code: string;
    message: string;
}

export type OauthTokenResponse = {
    access_token: string;
    token_type: string;
}