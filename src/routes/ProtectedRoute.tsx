import {useAuthStore} from "@/stores/auth.store.ts";
import {Navigate} from "react-router-dom";
import {LOGIN} from "@/constants/routes.constants.ts";
import type {ReactNode} from "react";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const token = useAuthStore(state => state.token)
    if(!token){
        return <Navigate to={LOGIN} replace={true}/>
    }
    return children;
};

export default ProtectedRoute;