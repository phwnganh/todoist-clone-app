import {create} from "zustand/react";

type AuthState = {
    token: string | null;
    login: (token: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
    token: localStorage.getItem("access_token"),
    login: token => {
        if(token){
            localStorage.setItem("access_token", token);
        }else{
            localStorage.removeItem("access_token");
        }
        set({token: token});
    },
    logout: () => {
        localStorage.removeItem("access_token");
        set({token: null})
    },
}));