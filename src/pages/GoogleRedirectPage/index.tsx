import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {PROJECTS} from "../../constants/routes.constants.ts";

const GoogleRedirectPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const returnedState = params.get("state");
        const storedState = sessionStorage.getItem("oauth_state");

        if(!code || returnedState !== storedState) {
            return;
        }

        fetch("http://localhost:9999/oauth/access-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
            })
        }).then(res => res.json()).then(res => {
            localStorage.setItem("access_token", res.access_token)
            navigate(PROJECTS)
        })
    return () => {
        sessionStorage.removeItem("oauth_state");
    }

    }, [navigate])
    return (
        <div>
            Signing in...
        </div>
    );
};

export default GoogleRedirectPage;