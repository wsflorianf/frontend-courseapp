import { useContext } from "react";
import { Context } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}){

    const {user} = useContext(Context)

    if(!user){
        return <Navigate to='/login' replace/>
    }else{
        return children
    }

}