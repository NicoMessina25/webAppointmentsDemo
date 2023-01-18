import axios from "axios";

const API_URL = "http://medere1.medere.localhost:8080";

export function getAllCities(){
    return axios.get(API_URL +  '/rest/frontend/providers/getcities').then(res => res.data)
}