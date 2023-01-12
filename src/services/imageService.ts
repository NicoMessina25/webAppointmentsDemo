import axios from "axios";


const url= window.location.href;
const baseUrl = new URL(url).origin;

export function getLogo(){
    
    //se debe usar base url, hardcodear rutas para desarrollo
    return axios.get('http://medere1.medere.localhost:8080/rest/webappointments/getImage').then(res=>res.data)
}