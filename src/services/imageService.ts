import axios from "axios";


const url= window.location.href;
const baseUrl = new URL(url).origin;

export function getLogo(){

    return axios.get('/api/notsecure/getImage').then(res=>res.data)
}