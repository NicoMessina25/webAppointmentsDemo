import { useContext } from "react";
import { appContext } from "../Context/appContext";

import { Navigate, Outlet } from 'react-router-dom';
import Login from "../Login/Login";
import { amilogged } from "../../services/loginService";

const PrivateComponent = ({children, ...props}:any) => {
    

    function serverConfirmation() {
      return true;  
      // console.log("verificando");
      //   try {
      //     amilogged().then(res=>{
      //       console.log(res)
      //       if (res.status === 403) {
      //           return false;
      //         }
      //       return true;
      //     })
      //   } catch (e) {
      //     return false;
      //   }
    }

    let storedSettings=localStorage.getItem("settings");
    if(storedSettings) 
        if(JSON.parse(storedSettings).userId===-1){
            return <Navigate to="/login"/>
        }
        else{
            if(serverConfirmation())
                return <Outlet/>
            else
                return <Navigate to="/login"/>
        }
    else{
        return <Navigate to="/login"/>
    }

}

export default PrivateComponent;