export type User = {
    id: string;
    email: string;
    full_name: string;
    has_password?: boolean;
    is_premium?: boolean;
    premium_status?: string;
    avatar_big?: string;
    avatar_medium?: string;
    avatar_s640?: string;
    avatar_small?: string;
    theme_id: string;
}

export type UserPayload = {
    current_password?: string;
    email?: string;
    full_name?: string;
    password?: string;
    theme?: number;
}