import axios from "axios";
import { useState } from "react";

export function getLanguage(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getLanguage').then(res=>res.data)
}

export function getCaptchaKey(siteKey:any){
    if(siteKey!=""){
        const key="";
        try{
            axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getWebAppointmentsCaptchaKey',{
                params:{
                    appid:2
                }
            }).then(res =>  res=res.data);
            console.log("retornando valor")
            return key;
            
        }catch{
            console.log("retornando valor invalido")
            return "invalid";
        }
    }else
        return siteKey;
   
    
}