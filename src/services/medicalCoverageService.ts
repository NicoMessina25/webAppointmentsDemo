import axios from "axios";

const API_URL = "http://medere1.medere.localhost:8080";

export function getAllMedicalCoverages(){
    return axios.get(API_URL +  '/rest/webappointments/getMedicalCompanies').then(res => res.data)
}

export function getPlans(filterId:any){
    return axios.get(API_URL +  '/rest/webappointments/getPlans', {
        params: {
            filterId: filterId
        }
    }).then(res => res.data)
}