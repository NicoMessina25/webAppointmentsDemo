import axios from "axios";
import { getDevice } from "./loginService";


export function getCaptchaKey(){
    return axios.get('/api/notsecure/getWebAppointmentsCaptchaKey',{
        params:{
            appid:2
        }
    }).then(res => {
        return res.data
    } );   
}

export function logout(){
    return axios.post('/api/auth/logout',{
        appId:2,
        deviceId:getDevice(),
    }).then(res => {
        return res.data
    } );   
}