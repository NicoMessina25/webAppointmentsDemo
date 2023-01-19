import axios from "axios";


export function getAllCities(){
    return axios.get(process.env.REACT_APP_MEDERE_ADDRESS +  '/rest/frontend/providers/getcities').then(res => res.data)
}