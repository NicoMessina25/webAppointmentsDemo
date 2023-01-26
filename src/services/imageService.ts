import axios from "axios";


const url= window.location.href;
const baseUrl = new URL(url).origin;

export function getLogo(){

    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS+'/rest/webappointments/getImage').then(res=>res.data)
}