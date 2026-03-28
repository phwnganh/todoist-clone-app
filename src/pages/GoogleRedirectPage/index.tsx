import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/stores/auth.store.ts";
import LoadingSpin from '@/components/ui/LoadingSpin.tsx';
import {INBOX} from "../../constants/routes.constants";

const GoogleRedirectPage = () => {
    const navigate = useNavigate()
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    const login = useAuthStore(state => state.login)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const returnedState = params.get("state");
        const storedState = sessionStorage.getItem("oauth_state");

        if(!code || returnedState !== storedState) {
            return;
        }

        fetch(`/api/oauth/access-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
            })
        }).then(res => res.json()).then(res => {
            login(res.access_token)
            navigate(INBOX)
        })
    return () => {
        sessionStorage.removeItem("oauth_state");
    }

    }, [login, navigate, API_BASE_URL])
    return (
        <LoadingSpin/>
    );
};

export default GoogleRedirectPage;