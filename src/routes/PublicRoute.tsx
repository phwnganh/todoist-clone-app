import type {ReactNode} from "react";
import {useAuthStore} from "../stores/auth.store.ts";
import {Navigate} from "react-router-dom";
import {PROJECTS} from "../constants/routes.constants.ts";

const PublicRoute = ({children}: {children: ReactNode}) => {
    const token = useAuthStore(state => state.token)

    if(token){
        return <Navigate to={PROJECTS} replace/>
    }
    return children;
};

export default PublicRoute;