import { useContext, useEffect, useState } from "react";
import { appContext } from "../Context/appContext";

import { Navigate, Outlet } from 'react-router-dom';
import Login from "../Login/Login";
import { amilogged } from "../../services/loginService";

const PrivateComponent =  ({children, ...props}:any) : JSX.Element => {

    const {getStorage}:any = useContext(appContext);

    

    let storedSettings=getStorage().getItem("settings");
    if(storedSettings) {
        let storedSettingsJson=JSON.parse(storedSettings)
        if(storedSettingsJson.userId===-1){
            return <Navigate to="/login"/>
        }
        else{
                if(storedSettingsJson.isLogged){
                    return <Outlet/>
                } else {
                    return <Navigate to="/login"/>
                }
                
            }
        }
    else{
        return <Navigate to="/login"/>
    }

}

export default PrivateComponent;